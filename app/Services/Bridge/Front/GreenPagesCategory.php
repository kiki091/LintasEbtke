<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\GreenPagesCategory as GreenPagesCategoryInterface;

class GreenPagesCategory
{
	protected $greenPagesCategory;

    public function __construct(GreenPagesCategoryInterface $greenPagesCategory)
    {
        $this->greenPagesCategory = $greenPagesCategory;
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->greenPagesCategory->getData($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getDetail($slug)
    {
        return $this->greenPagesCategory->getDetail($slug);
    }
}