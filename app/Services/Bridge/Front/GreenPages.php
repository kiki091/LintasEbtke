<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\GreenPages as GreenPagesInterface;

class GreenPages
{
	protected $greenPages;

    public function __construct(GreenPagesInterface $greenPages)
    {
        $this->greenPages = $greenPages;
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->greenPages->getData($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getDetail($slug)
    {
        return $this->greenPages->getDetail($slug);
    }
}