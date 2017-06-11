<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\CompanyHistory as CompanyHistoryInterface;

class CompanyHistory
{
	protected $companyHistory;

    public function __construct(CompanyHistoryInterface $companyHistory)
    {
        $this->companyHistory = $companyHistory;
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getCompanyHistory($params = [])
    {
        return $this->companyHistory->getCompanyHistory($params);
    }
}