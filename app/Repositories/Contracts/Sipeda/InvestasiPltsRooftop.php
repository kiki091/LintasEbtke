<?php

namespace App\Repositories\Contracts\Sipeda;


interface InvestasiPltsRooftop
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