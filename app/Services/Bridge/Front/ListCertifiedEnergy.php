<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\ListCertifiedEnergy as ListCertifiedEnergyInterface;

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
}