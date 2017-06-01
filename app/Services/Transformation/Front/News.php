<?php

namespace App\Services\Transformation\Front;

class News
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getNewsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNewsTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setNewsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : DEFAULT_IMAGE_DIRECTORY,
                
                'slug' => isset($data['slug']) ? $data['slug'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'introduction' => isset($data['translation']['introduction']) ? str_limit($data['translation']['introduction'],100) : '',
            ];
        }, $data);
        
        return $dataTransform;
    }
}