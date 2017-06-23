<?php

namespace App\Services\Transformation\Front;

class Industri
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getIndustriTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setIndustriTransform($data);
    }

    public function getDetailIndustriTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setDetailIndustriTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setIndustriTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(INDUSTRI_PAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
                
                'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'introduction' => isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '',
                'created_at' => isset($data['created_at']) ? date('d/m/Y g:i:s A', strtotime($data['created_at'])) : '',
                'created_at_home' => isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '',
                'days_ago' => isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set Detail Transformation
     * @param $data
     * @return array
     */
    protected function setDetailIndustriTransform($data)
    {
        $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(INDUSTRI_PAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['introduction'] = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['description'] = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title'] = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword'] = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description'] = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        $dataTransform['created_at_home'] = isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '';
        $dataTransform['days_ago'] = isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '';

        return $dataTransform;
    }
}