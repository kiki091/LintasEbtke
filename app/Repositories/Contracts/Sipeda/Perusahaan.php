<?php

namespace App\Repositories\Contracts\Sipeda;


interface Perusahaan
{

    /**
     * @param $params
     * @return mixed
     */
    public function setSipedaAuthSession($params);
    
    /**
     * @param $params
     * @return mixed
     */
    public function registered($params);
    
} 