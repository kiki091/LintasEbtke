<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\ListEnergyAuditor as ListEnergyAuditorInterface;

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

}