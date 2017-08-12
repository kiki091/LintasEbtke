<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\InvestasiPowerProducer as InvestasiPowerProducerInterface;

class InvestasiPowerProducer {

    /**
     * @var UserInterface
     */
    protected $investasiPowerProducer;

    public function __construct(InvestasiPowerProducerInterface $investasiPowerProducer)
    {
        $this->investasiPowerProducer = $investasiPowerProducer;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->investasiPowerProducer->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = array())
    {
        return $this->investasiPowerProducer->store($params);
    }

} 