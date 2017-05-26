<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Category as CategoryInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Category as CategoryServices;
use App\Models\CategoryTrans as CategoryTransServices;
use App\Services\Transformation\Front\Category as CategoryTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Category extends BaseImplementation implements CategoryInterface
{

    protected $category;
    protected $categoryTrans;
    protected $categoryTransformation;

    function __construct(CategoryServices $category, CategoryTransServices $categoryTrans, CategoryTransformation $categoryTransformation)
    {
    	$this->category = $category;
        $this->categoryTrans = $categoryTrans;
    	$this->categoryTransformation = $categoryTransformation;
    }

    public function getCategoryForLanding($params = array())
    {
    	$params = [
            "is_active" => true,
            "is_landing" => true
        ];

        $categoryData = $this->category($params);

        return $this->categoryTransformation->getCategoryForLandingTransform($categoryData);
    }

    /**
     * Get All Data Category Overview
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function category($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $category = $this->category
            ->with('translation')
            ->with('translations');

        if(isset($params['is_active'])) {
            $category->isActive($params['is_active']);
        }

        if(isset($params['is_landing'])) {
            $category->isLanding($params['is_landing']);
        }

        if(!$category->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $category->get()->toArray();
                } 
                else 
                {
                    return $category->first()->toArray();
                }

            break;
        }
    }
}