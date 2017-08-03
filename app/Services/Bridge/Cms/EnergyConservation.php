<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\EnergyConservation as EnergyConservationInterface;

class EnergyConservation
{
	protected $energyConservation;

    public function __construct(EnergyConservationInterface $energyConservation)
    {
        $this->energyConservation = $energyConservation;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->energyConservation->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->energyConservation->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->energyConservation->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->energyConservation->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->energyConservation->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->energyConservation->delete($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function editImageSlider($params = [])
    {
        return $this->energyConservation->editImageSlider($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function deleteImageSlider($params = [])
    {
        return $this->energyConservation->deleteImageSlider($params);
    }
}