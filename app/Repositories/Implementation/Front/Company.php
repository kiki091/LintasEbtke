<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Company as CompanyInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Company as CompanyServices;
use App\Models\CompanyTrans as CompanyTransServices;
use App\Services\Transformation\Front\Company as CompanyTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Company extends BaseImplementation implements CompanyInterface
{

    protected $company;
    protected $companyTrans;
    protected $companyTransformation;

    function __construct(CompanyServices $company, CompanyTransServices $companyTrans, CompanyTransformation $companyTransformation)
    {
    	$this->company = $company;
        $this->companyTrans = $companyTrans;
    	$this->companyTransformation = $companyTransformation;
    }

    public function getDataForLanding($params = array())
    {
    	$params = [
            "is_active" => true,
            "is_show_landing" => true,
        ];

        $companyData = $this->company($params, 'asc', 'array', true);

        return $this->companyTransformation->getCompanyForLandingTransform($companyData);
    }

    public function getDetail($slug)
    {
        $params = [
            "is_active" => true,
            "slug"      => $slug
        ];

        $companyDetail = $this->company($params, 'asc', 'array', true);

        return $this->companyTransformation->getCompanyForDetailTransform($companyDetail);
    }

    /**
     * Get All Data Company Overview
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function company($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $company = $this->company
            ->with('translation')
            ->with('translations')
            ->with('category');

        if(isset($params['slug']) && $params['slug']) {
            $company->whereHas('translation', function($q) use ($params) {
                $q->isSlug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $company->isActive($params['is_active']);
        }

        if(!$company->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $company->get()->toArray();
                } 
                else 
                {
                    return $company->first()->toArray();
                }

            break;
        }
    }
}