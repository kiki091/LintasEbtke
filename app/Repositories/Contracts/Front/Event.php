<?php

namespace App\Repositories\Contracts\Front;


interface Event
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
    public function getDetail($slug);

}