<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Category as CategoryInterface;

class Category
{
	protected $category;

    public function __construct(CategoryInterface $category)
    {
        $this->category = $category;
    }

    /**
     * Get Data Category Overview For Landing Page
     * @param $params
     * @return mixed
     */
    public function getCategoryForLanding()
    {
        return $this->category->getCategoryForLanding();
    }
}