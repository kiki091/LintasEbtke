<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\Seo as SeoInterface;

class Seo
{
	protected $seo;

    public function __construct(SeoInterface $seo)
    {
        $this->seo = $seo;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params)
    {
        return $this->seo->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params, $key)
    {
        return $this->seo->store($params, $key);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->seo->edit($params);
    }
}