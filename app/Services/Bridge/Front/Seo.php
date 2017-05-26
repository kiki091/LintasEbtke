<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Seo as SeoInterface;

class Seo
{
	protected $seo;

    public function __construct(SeoInterface $seo)
    {
        $this->seo = $seo;
    }

    /**
     * Get Seo Data 
     * @param $params
     * @return mixed
     */
    public function getSeo($key)
    {
        return $this->seo->getSeo($key);
    }
}