<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\MainBanner as MainBannerInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\MainBanner as MainBannerServices;
use App\Models\MainBannerTrans as MainBannerTransServices;
use App\Redis\MainBanner as MainBannerRedis;
use App\Services\Transformation\Front\MainBanner as MainBannerTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class MainBanner extends BaseImplementation implements MainBannerInterface
{
	protected $message;
    protected $mainBanner;
    protected $mainBannerTrans;
    protected $mainBannerTransformation;


    function __construct(MainBannerServices $mainBanner, MainBannerTransServices $mainBannerTrans, MainBannerTransformation $mainBannerTransformation)
    {
    	$this->mainBanner = $mainBanner;
        $this->mainBannerTrans = $mainBannerTrans;
    	$this->mainBannerTransformation = $mainBannerTransformation;
    }

    public function getMainBanner($data)
    {
        $params = [
            "key" => isset($data['key']) ? $data['key'] : '',
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
            "is_active" => true,
            "order_by"  => "order",
        ];

        $mainBannerData = $this->mainBanner($params);

        return $this->mainBannerTransformation->getMainBannerTransform($mainBannerData);
    }

    /**
     * Get All Data Main Banner
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function mainBanner($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $mainBanner = $this->mainBanner
            ->with('translation')
            ->with('translations');

        if(isset($params['key'])) {
            $mainBanner->where('key', $params['key']);
        }

        if(isset($params['limit_data']) && !empty($params['limit_data'])) {
            $mainBanner->skip(0)->take($params['limit_data']);
        }

        if(isset($params['is_active'])) {
            $mainBanner->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $mainBanner->orderBy('order', $orderType);
        }

        if(!$mainBanner->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $mainBanner->get()->toArray();
                } 
                else 
                {
                    return $mainBanner->first()->toArray();
                }

            break;
        }
    }

}
