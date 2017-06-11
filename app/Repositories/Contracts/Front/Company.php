<?php

namespace App\Repositories\Contracts\Front;


interface Company
{

    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getCompanyHistory($params);

    
    /**
     * Get Data Seo
     * @param $params
     * @return mixed
     */
    public function getOrganizationStructure($params);



}