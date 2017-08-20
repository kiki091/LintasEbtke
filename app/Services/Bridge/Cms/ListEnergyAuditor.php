<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\ListEnergyAuditor as ListEnergyAuditorInterface;

class ListEnergyAuditor
{
	protected $listEnergyAuditor;

    public function __construct(ListEnergyAuditorInterface $listEnergyAuditor)
    {
        $this->listEnergyAuditor = $listEnergyAuditor;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->listEnergyAuditor->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->listEnergyAuditor->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->listEnergyAuditor->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->listEnergyAuditor->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->listEnergyAuditor->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->listEnergyAuditor->delete($params);
    }
}