<?php

namespace App\Repositories\Contracts\Front;


interface NreccResources
{

    /**
     * Get Data Nrecc Resources
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * Get Data Nrecc Resources
     * @param $params
     * @return mixed
     */
    public function detail($params);



}