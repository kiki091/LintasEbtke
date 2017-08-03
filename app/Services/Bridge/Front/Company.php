<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Company as CompanyInterface;

class Company
{
	protected $company;

    public function __construct(CompanyInterface $company)
    {
        $this->company = $company;
    }


    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getCompanyHistory($params = [])
    {
        return $this->company->getCompanyHistory($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getOrganizationStructure($params)
    {
        return $this->company->getOrganizationStructure($params);
    }
}