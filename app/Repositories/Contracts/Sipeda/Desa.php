<?php

namespace App\Repositories\Contracts\Sipeda;


interface Desa
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
    public function getDataByKecamatan($params);
    
} 