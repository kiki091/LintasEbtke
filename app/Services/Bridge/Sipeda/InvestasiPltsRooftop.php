<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\InvestasiPltsRooftop as InvestasiPltsRooftopInterface;

class InvestasiPltsRooftop {

    /**
     * @var UserInterface
     */
    protected $investasiPltsRooftop;

    public function __construct(InvestasiPltsRooftopInterface $investasiPltsRooftop)
    {
        $this->investasiPltsRooftop = $investasiPltsRooftop;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->investasiPltsRooftop->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = array())
    {
        return $this->investasiPltsRooftop->store($params);
    }

} 