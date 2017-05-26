<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Gcg as GcgInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Gcg as GcgServices;
use App\Models\GcgTrans as GcgTransServices;
use App\Services\Transformation\Front\Gcg as GcgTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Gcg extends BaseImplementation implements GcgInterface
{

    protected $gcg;
    protected $gcgTrans;
    protected $gcgTransformation;

    function __construct(GcgServices $gcg, GcgTransServices $gcgTrans, GcgTransformation $gcgTransformation)
    {
    	$this->gcg = $gcg;
        $this->gcgTrans = $gcgTrans;
    	$this->gcgTransformation = $gcgTransformation;
    }

    public function getGCGForLanding($params = array())
    {
    	$params = [
            "is_active" => true,
            "is_landing" => true,
            "limit_data" => 1
        ];

        $gcgData = $this->gcg($params);

        return $this->gcgTransformation->getGcgForLandingTransform($gcgData);
    }

    /**
     * Get All Data GCG Overview
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function gcg($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $gcg = $this->gcg
            ->with('tag_translation')
            ->with('translation')
            ->with('translations');

        if(isset($params['is_active'])) {
            $gcg->isActive($params['is_active']);
        }

        if(isset($params['slug'])) {
            $gcg->whereHas('translation', function($q) use ($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_landing'])) {
            $gcg->isLanding($params['is_landing']);
        }

        if(isset($params['limit_data'])) {
            $gcg->take($params['limit_data']);
        }

        if(isset($params['order_by'])) {
            $gcg->orderBy($params['order_by'], $orderType);
        }

        if(isset($params['id'])) {
            $gcg->id($params['id']);
        }


        if(isset($params['limit_data'])) {
            $gcg->take($params['limit_data']);
        }

        if(!$gcg->count())
            return array();

        return $gcg->first()->toArray();
    }
}