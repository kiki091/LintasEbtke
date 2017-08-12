<?php

namespace App\Repositories\Contracts\Sipeda;


interface Kabupaten
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
    public function getDataByProvinsi($params);
    
} 