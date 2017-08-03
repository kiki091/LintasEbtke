<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\EnergyConservation as EnergyConservationInterface;

class EnergyConservation
{
	protected $energyConservation;

    public function __construct(EnergyConservationInterface $energyConservation)
    {
        $this->energyConservation = $energyConservation;
    }

    /**
     * Get Data 
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->energyConservation->getData($params);
    }

    /**
     * Get Data 
     * @param $params
     * @return mixed
     */
    public function showMapsData($params = [])
    {
        return $this->energyConservation->showMapsData($params);
    }

    /**
     * Get Data 
     * @param $params
     * @return mixed
     */
    public function detail($slug)
    {
        return $this->energyConservation->detail($slug);
    }
}