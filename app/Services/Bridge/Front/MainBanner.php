<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\MainBanner as MainBannerInterface;

class MainBanner
{
	protected $mainBanner;

    public function __construct(MainBannerInterface $mainBanner)
    {
        $this->mainBanner = $mainBanner;
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getMainBanner($params)
    {
        return $this->mainBanner->getMainBanner($params);
    }
}