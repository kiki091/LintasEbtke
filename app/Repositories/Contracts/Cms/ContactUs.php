<?php

namespace App\Repositories\Contracts\Cms;


interface ContactUs
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
    public function show($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function delete($params);


}