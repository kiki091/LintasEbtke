<?php

namespace App\Repositories\Contracts\Sipeda;


interface ProyekPowerProducer
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
    
} 