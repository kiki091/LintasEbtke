<?php

namespace App\Repositories\Contracts\Front;


interface NreccEvents
{

    /**
     * Get Data Nrecc Events
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * Get Detail Nrecc Events
     * @param $params
     * @return mixed
     */
    public function detail($params);



}