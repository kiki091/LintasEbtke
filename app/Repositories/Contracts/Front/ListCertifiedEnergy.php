<?php

namespace App\Repositories\Contracts\Front;


interface ListCertifiedEnergy
{

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params);
}