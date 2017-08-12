<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\InvestasiPabrikanAnekaEbt as InvestasiPabrikanAnekaEbtInterface;

class InvestasiPabrikanAnekaEbt {

    /**
     * @var UserInterface
     */
    protected $investasiPabrikanAnekaEbt;

    public function __construct(InvestasiPabrikanAnekaEbtInterface $investasiPabrikanAnekaEbt)
    {
        $this->investasiPabrikanAnekaEbt = $investasiPabrikanAnekaEbt;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->investasiPabrikanAnekaEbt->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = array())
    {
        return $this->investasiPabrikanAnekaEbt->store($params);
    }

} 