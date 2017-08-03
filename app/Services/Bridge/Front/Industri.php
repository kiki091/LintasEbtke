<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Industri as IndustriInterface;

class Industri
{
	protected $industri;

    public function __construct(IndustriInterface $industri)
    {
        $this->industri = $industri;
    }


    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->industri->getData($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getDetail($params)
    {
        return $this->industri->getDetail($params);
    }
}