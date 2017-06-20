<?php

namespace App\Repositories\Contracts\Front;


interface GreenPagesCategory
{

    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getDetail($params);



}