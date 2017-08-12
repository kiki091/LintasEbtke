<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\Kabupaten as KabupatenInterface;

class Kabupaten {

    /**
     * @var UserInterface
     */
    protected $kabupaten;

    public function __construct(KabupatenInterface $kabupaten)
    {
        $this->kabupaten = $kabupaten;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->kabupaten->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getDataByProvinsi($params = array())
    {
        return $this->kabupaten->getDataByProvinsi($params);
    }

} 