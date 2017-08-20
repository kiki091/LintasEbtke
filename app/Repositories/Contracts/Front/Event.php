<?php

namespace App\Repositories\Contracts\Front;


interface Event
{

    /**
     * Get Data Event
     * @param $params
     * @return mixed
     */
    public function getData($params);

    /**
     * Get Data Event By Month
     * @param $params
     * @return mixed
     */
    public function getEventByMonth($params);

    
    /**
     * Get Detail Event
     * @param $params
     * @return mixed
     */
    public function getDetail($slug);

}