<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Gp3k as Gp3kInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Gp3k as Gp3kServices;
use App\Models\Gp3kTrans as Gp3kTransServices;
use App\Services\Transformation\Front\Gp3k as Gp3kTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Gp3k extends BaseImplementation implements Gp3kInterface
{

    protected $gp3k;
    protected $gp3kTrans;
    protected $gp3kTransformation;

    function __construct(Gp3kServices $gp3k, Gp3kTransServices $gp3kTrans, Gp3kTransformation $gp3kTransformation)
    {
    	$this->gp3k = $gp3k;
        $this->gp3kTrans = $gp3kTrans;
    	$this->gp3kTransformation = $gp3kTransformation;
    }

    public function getGp3kForLanding($params = array())
    {
    	$params = [
            "is_active" => true,
            "is_landing" => true,
            "limit_data" => 1
        ];

        $gp3kData = $this->gp3k($params);

        return $this->gp3kTransformation->getGp3kForLandingTransform($gp3kData);
    }

    /**
     * Get All Data GCG Overview
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function gp3k($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $gp3k = $this->gp3k
            ->with('tag_translation')
            ->with('translation')
            ->with('translations');

        if(isset($params['is_active'])) {
            $gp3k->isActive($params['is_active']);
        }

        if(isset($params['slug'])) {
            $gp3k->whereHas('translation', function($q) use ($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_landing'])) {
            $gp3k->isLanding($params['is_landing']);
        }

        if(isset($params['limit_data'])) {
            $gp3k->take($params['limit_data']);
        }

        if(isset($params['order_by'])) {
            $gp3k->orderBy($params['order_by'], $orderType);
        }

        if(isset($params['id'])) {
            $gp3k->id($params['id']);
        }


        if(isset($params['limit_data'])) {
            $gp3k->take($params['limit_data']);
        }

        if(!$gp3k->count())
            return array();

        return $gp3k->first()->toArray();
    }
}