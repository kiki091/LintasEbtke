<?php

namespace App\Repositories\Contracts\Front;


interface News
{

    /**
     * Get Data  News Home
     * @param $params
     * @return mixed
     */
    public function getNewsHome($params);

    
    /**
     * Get Data  Popular News
     * @param $params
     * @return mixed
     */
    public function getPopularNews($params);


    /**
     * Get Data  Detail
     * @param $params
     * @return mixed
     */
    public function getNewsDetail($slug);



}