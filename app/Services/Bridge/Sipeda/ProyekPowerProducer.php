<?php

namespace App\Services\Bridge\Sipeda;

use App\Repositories\Contracts\Sipeda\ProyekPowerProducer as ProyekPowerProducerInterface;

class ProyekPowerProducer {

    /**
     * @var UserInterface
     */
    protected $proyekPowerProducer;

    public function __construct(ProyekPowerProducerInterface $proyekPowerProducer)
    {
        $this->proyekPowerProducer = $proyekPowerProducer;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->proyekPowerProducer->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = array())
    {
        return $this->proyekPowerProducer->store($params);
    }

} 