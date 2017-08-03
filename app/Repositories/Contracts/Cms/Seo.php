<?php

namespace App\Repositories\Contracts\Cms;


interface Seo
{

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function store($params, $key);

    
    /**
     * @param $params
     * @return mixed
     */
    public function edit($params);

}