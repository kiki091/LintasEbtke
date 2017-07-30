<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\CapacityBuilding as CapacityBuildingInterface;

class CapacityBuilding {

    /**
     * @var UserInterface
     */
    protected $capacityBuilding;

    public function __construct(CapacityBuildingInterface $capacityBuilding)
    {
        $this->capacityBuilding = $capacityBuilding;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->capacityBuilding->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = array())
    {
        return $this->capacityBuilding->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = array())
    {
        return $this->capacityBuilding->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function publish($params = array())
    {
        return $this->capacityBuilding->publish($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = array())
    {
        return $this->capacityBuilding->delete($params);
    }

} 