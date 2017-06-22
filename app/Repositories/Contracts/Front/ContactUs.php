<?php

namespace App\Repositories\Contracts\Front;


interface ContactUs
{

    /**
     * Store Data
     * @param $params
     * @return mixed
     */
    public function store($params);

}