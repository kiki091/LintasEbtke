<?php

namespace App\Repositories\Contracts\Front;


interface ListEnergyAuditor
{

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params);
}