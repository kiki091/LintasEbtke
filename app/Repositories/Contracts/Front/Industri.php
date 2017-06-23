<?php

namespace App\Repositories\Contracts\Front;


interface Industri
{

    /**
     * Get Data 
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * Get Detail
     * @param $params
     * @return mixed
     */
    public function getDetail($params);



}