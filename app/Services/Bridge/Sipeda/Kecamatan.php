<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\Kecamatan as KecamatanInterface;

class Kecamatan {

    /**
     * @var UserInterface
     */
    protected $kecamatan;

    public function __construct(KecamatanInterface $kecamatan)
    {
        $this->kecamatan = $kecamatan;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->kecamatan->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getDataByKabupaten($params = array())
    {
        return $this->kecamatan->getDataByKabupaten($params);
    }

} 