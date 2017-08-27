<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\Province as ProvinceInterface;

class Province
{
	protected $province;

    public function __construct(ProvinceInterface $province)
    {
        $this->province = $province;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->province->getData($params);
    }
}