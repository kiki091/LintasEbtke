<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\ListCertifiedEnergy as ListCertifiedEnergyInterface;

class ListCertifiedEnergy
{
	protected $listCertifiedEnergy;

    public function __construct(ListCertifiedEnergyInterface $listCertifiedEnergy)
    {
        $this->listCertifiedEnergy = $listCertifiedEnergy;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->listCertifiedEnergy->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->listCertifiedEnergy->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->listCertifiedEnergy->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->listCertifiedEnergy->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->listCertifiedEnergy->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->listCertifiedEnergy->delete($params);
    }
}