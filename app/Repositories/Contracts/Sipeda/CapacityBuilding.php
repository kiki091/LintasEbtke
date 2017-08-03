<?php

namespace App\Repositories\Contracts\Sipeda;


interface CapacityBuilding
{

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params);
    
    /**
     * @param $params
     * @return mixed
     */
    public function store($params);

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params);

    /**
     * @param $params
     * @return mixed
     */
    public function publish($params);

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params);
    
} 