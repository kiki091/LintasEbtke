<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\InvestmentServices as InvestmentServicesInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\InvestmentServices as InvestmentServicesModels;
use App\Models\InvestmentServicesTrans as InvestmentServicesModelsTrans;
use App\Models\InvestmentServicesRelated as InvestmentServicesModelsRelated;
use App\Redis\InvestmentServices as InvestmentServicesRedis;
use App\Services\Transformation\Front\InvestmentServices as InvestmentServicesTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class InvestmentServices extends BaseImplementation implements InvestmentServicesInterface
{
    protected $investmentServices;
    protected $investmentServicesTrans;
    protected $investmentServicesTransformation;


    function __construct(InvestmentServicesModels $investmentServices, InvestmentServicesModelsTrans $investmentServicesTrans, InvestmentServicesTransformation $investmentServicesTransformation)
    {
    	$this->investmentServices = $investmentServices;
        $this->investmentServicesTrans = $investmentServicesTrans;
    	$this->investmentServicesTransformation = $investmentServicesTransformation;
    }


    /**
     * Get Data Investment Services
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getData($data)
    {
        
        $params = [
            "is_active" => true,
            "limit_data" => isset($data['limit_data']) ? $data['limit_data'] : '',
            "order_by"  => "order",
        ];

        $investmentServicesGetData = $this->investmentServices($params, 'desc', 'array', false);

        return $this->investmentServicesTransformation->getInvestmentServicesTransform($investmentServicesGetData);
        
    }

    /**
     * Get Detail Data Investment Services
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getDetail($data)
    {

        $params = [
            "is_active" => true,
            "slug" => $data['slug'],
        ];

        $investmentServicesDetail = $this->investmentServices($params, 'desc', 'array', true);

        $this->addViewer($params);

        return $this->investmentServicesTransformation->getInvestmentServicesDetailTransform($investmentServicesDetail);
        
    }

    /**
     * Get All Data News
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function investmentServices($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $investmentServices = $this->investmentServices
            ->with('translation')
            ->with('translations')
            ->with('related');

        if(isset($params['slug']) && $params['slug']) {
            $investmentServices->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['total_view'])) {
            $investmentServices->popular($params['total_view']);
        }

        if(isset($params['is_active'])) {
            $investmentServices->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $investmentServices->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $investmentServices->orderBy('order', $orderType);
        }

        if(!$investmentServices->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $investmentServices->get()->toArray();
                } 
                else 
                {
                    return $investmentServices->first()->toArray();
                }

            break;
        }
    }

    /**
     * @param $data
     */
    public function addViewer($params)
    {
        try {
            $blogKey = 'investment_services_' . $params['slug'];

            if (!Session::has($blogKey)) {
                $this->news->where('slug', $params['slug'])->increment('total_view');
                Session::put($blogKey, 1);
            }
        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

}
