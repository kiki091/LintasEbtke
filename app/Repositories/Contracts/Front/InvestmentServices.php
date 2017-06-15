<?php

namespace App\Repositories\Contracts\Front;


interface InvestmentServices
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
    public function getDetail($params);



}