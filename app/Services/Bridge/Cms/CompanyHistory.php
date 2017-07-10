<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\CompanyHistory as CompanyHistoryInterface;

class CompanyHistory
{
	protected $companyHistory;

    public function __construct(CompanyHistoryInterface $companyHistory)
    {
        $this->companyHistory = $companyHistory;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->companyHistory->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->companyHistory->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->companyHistory->edit($params);
    }
}