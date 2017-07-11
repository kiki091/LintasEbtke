<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\InvestmentServices as InvestmentServicesInterface;

class InvestmentServices
{
	protected $investmentServices;

    public function __construct(InvestmentServicesInterface $investmentServices)
    {
        $this->investmentServices = $investmentServices;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->investmentServices->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->investmentServices->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->investmentServices->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->investmentServices->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->investmentServices->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->investmentServices->delete($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function editImageSlider($params = [])
    {
        return $this->investmentServices->editImageSlider($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function deleteImageSlider($params = [])
    {
        return $this->investmentServices->deleteImageSlider($params);
    }
}