<?php

namespace App\Repositories\Contracts\Front;


interface Tools
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
    public function getDataTopRated($params);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getDataDownloaded($getPapersTopDownloaded);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getDetail($slug);



}