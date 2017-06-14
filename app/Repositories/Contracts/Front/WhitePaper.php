<?php

namespace App\Repositories\Contracts\Front;


interface WhitePaper
{

    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getPapaers($params);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getPapersTopRated($params);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getPapersTopDownloaded($getPapersTopDownloaded);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getPapersDetail($slug);



}