<?php

namespace App\Repositories\Contracts\Front;


interface News
{

    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function getNewsHome($params);

    
    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function getPopularNews($params);

    
    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function getEventHome($params);

    
    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function getPopularEvent($params);

    /**
     * Get Data Main Banner
     * @param $params
     * @return mixed
     */
    public function getNewsDetail($slug);



}