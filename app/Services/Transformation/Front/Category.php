<?php

namespace App\Services\Transformation\Front;

use App\Custom\PusriHelper;
 
class Category
{
	/**
     * Get Category Overview Transformation
     * @param $data
     * @return array
     */
    public function getCategoryForLandingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setCategoryForLandingTransform($data);
    }

    protected function setCategoryForLandingTransform($data)
    {
    	if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(CATEGORY_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
                'is_active' => isset($data['is_active']) ? $data['is_active'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

}