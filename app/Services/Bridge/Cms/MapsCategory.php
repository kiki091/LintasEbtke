<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\MapsCategory as MapsCategoryInterface;

class MapsCategory
{
	protected $mapsCategory;

    public function __construct(MapsCategoryInterface $mapsCategory)
    {
        $this->mapsCategory = $mapsCategory;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->mapsCategory->getData($params);
    }

}