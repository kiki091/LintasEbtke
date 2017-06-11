<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Company as CompanyInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\CompanyHistory as CompanyHistoryServices;
use App\Models\OrganizationStructure as OrganizationStructureServices;
use App\Redis\Company as CompanyRedis;
use App\Services\Transformation\Front\Company as CompanyTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Company extends BaseImplementation implements CompanyInterface
{
	protected $message;
    protected $companyHistory;
    protected $organizationStructure;
    protected $organizationStructureTrans;
    protected $companyTransformation;


    function __construct(CompanyHistoryServices $companyHistory, OrganizationStructureServices $organizationStructure, CompanyTransformation $companyTransformation)
    {
    	$this->companyHistory = $companyHistory;
        $this->organizationStructure = $organizationStructure;
    	$this->companyTransformation = $companyTransformation;
    }

    public function getCompanyHistory($params)
    {
        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(CompanyRedis::COMPANY_HISTORY_KEY, $params['key']);

        $dataCompanyHistory = Cache::rememberForever($redisKey, function() use ($params, $redisKey)
        {
            $params = [
                "is_active" => true,
                "order_by" => 'order',
            ];

            $companyHistoryData = $this->companyHistory($params);

            return $this->companyTransformation->getCompanyHistoryTransform($companyHistoryData);
        });


        return $dataCompanyHistory;
    }

    public function getOrganizationStructure($params)
    {
        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(CompanyRedis::COMPANY_ORGANIZATION_STRUCTURE_KEY, $params['key']);

        $dataOrganizationStructure = Cache::rememberForever($redisKey, function() use ($params, $redisKey)
        {
            $params = [
                "is_active" => true,
                "order_by" => 'order',
            ];

            $organizationStructureData = $this->organizationStructure($params, 'asc', 'array', false);

            return $this->companyTransformation->getOrganizationStructureTransform($organizationStructureData);
        });


        return $dataOrganizationStructure;
    }

    /**
     * Get All Data Company History
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function companyHistory($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $companyHistory = $this->companyHistory
            ->with('translation')
            ->with('translations');

        return $companyHistory->first()->toArray();
                
    }

    /**
     * Get All Data Company Organization Structure
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function organizationStructure($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $organizationStructure = $this->organizationStructure
            ->with('translation')
            ->with('translations');

        if(isset($params['limit_data'])) {
            $organizationStructure->take($params['limit_data']);
        }

        if(isset($params['is_active'])) {
            $organizationStructure->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $organizationStructure->orderBy($params['order_by'], $orderType);
        }

        if(!$organizationStructure->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $organizationStructure->get()->toArray();
                } 
                else 
                {
                    return $organizationStructure->first()->toArray();
                }

            break;
        }
    }

}
