<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Industri as IndustriInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Industri as IndustriServices;
use App\Models\IndustriTrans as IndustriTransServices;
use App\Services\Transformation\Front\Industri as IndustriTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Industri extends BaseImplementation implements IndustriInterface
{
	protected $message;
    protected $industri;
    protected $industriTrans;
    protected $industriTransformation;


    function __construct(IndustriServices $industri, IndustriTransServices $industriTrans, IndustriTransformation $industriTransformation)
    {
    	$this->industri = $industri;
        $this->industriTrans = $industriTrans;
    	$this->industriTransformation = $industriTransformation;
    }

    public function getData($params)
    {
        
        $params = [
            "is_active" => true,
            "order_by" => 'order',
        ];

        $industriData = $this->industri($params);

        return $this->industriTransformation->getIndustriTransform($industriData);
    }

    public function getDetail($slug)
    {
        
        $params = [
            "slug" => $slug,
        ];

        $industriData = $this->industri($params, 'asc', 'array', true);

        return $this->industriTransformation->getDetailIndustriTransform($industriData);
        
    }

    /**
     * Get All Data industri
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function industri($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $industri = $this->industri
            ->with('translation')
            ->with('translations');

        if(isset($params['slug']) && $params['slug']) {
            $industri->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['limit_data'])) {
            $industri->take($params['limit_data']);
        }

        if(isset($params['is_active'])) {
            $industri->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $industri->orderBy($params['order_by'], $orderType);
        }

        if(!$industri->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $industri->get()->toArray();
                } 
                else 
                {
                    return $industri->first()->toArray();
                }

            break;
        }
    }

}
