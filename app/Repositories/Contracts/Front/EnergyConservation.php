<?php

namespace App\Repositories\Contracts\Front;


interface EnergyConservation
{

    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function showMapsData($params);
    /**
     * Get Detail
     * @param $params
     * @return mixed
     */
    public function detail($slug);

}