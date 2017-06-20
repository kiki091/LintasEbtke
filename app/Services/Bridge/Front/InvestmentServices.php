<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\InvestmentServices as InvestmentServicesInterface;

class InvestmentServices
{
	protected $investmentServices;

    public function __construct(InvestmentServicesInterface $investmentServices)
    {
        $this->investmentServices = $investmentServices;
    }

    /**
     * Get Data Investment Services Home
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->investmentServices->getData($params);
    }

    /**
     * Get Data Investment Services Home
     * @param $params
     * @return mixed
     */
    public function getDetail($params = [])
    {
        return $this->investmentServices->getDetail($params);
    }
}