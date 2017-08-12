<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\Provinsi as ProvinsiInterface;

class Provinsi {

    /**
     * @var UserInterface
     */
    protected $provinsi;

    public function __construct(ProvinsiInterface $provinsi)
    {
        $this->provinsi = $provinsi;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->provinsi->getData($params);
    }

} 