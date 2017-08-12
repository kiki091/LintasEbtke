<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\Desa as DesaInterface;

class Desa {

    /**
     * @var UserInterface
     */
    protected $desa;

    public function __construct(DesaInterface $desa)
    {
        $this->desa = $desa;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->desa->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getDataByKecamatan($params = array())
    {
        return $this->desa->getDataByKecamatan($params);
    }

} 