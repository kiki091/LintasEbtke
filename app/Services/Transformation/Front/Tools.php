<?php

namespace App\Services\Transformation\Front;

class Tools
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getToolsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setToolsTransform($data);
    }

    /**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getSingleToolsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleToolsTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setToolsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'filename' => isset($data['filename']) ? $data['filename'] : '',
                'description' => isset($data['translation']['description']) ? str_limit($data['translation']['description'],350) : '',
                'slug' => isset($data['slug']) ? $data['slug'] : '',
                'url' => isset($data['url']) ? $data['url']: '',
                'is_downloaded' => isset($data['downloaded']) ? $data['downloaded'] : 0,
                'is_rating' => isset($data['rating']) ? $data['rating'] : 0,
                'tools_type' => isset($data['tools_type']) ? $data['tools_type'] : '',
                'country' => isset($data['country']) ? $data['country'] : '',
                'version' => isset($data['version']) ? $data['version'] : '',
                'platform' => isset($data['platform']) ? $data['platform'] : '',
                'manufacture' => isset($data['manufacture']) ? $data['manufacture'] : '',
                'file_size' => isset($data['file_size']) ? $data['file_size'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(TOOLS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    protected function setSingleToolsTransform($data)
    {
        $dataTransform['filename'] = isset($data['filename'])? $data['filename'] : '';
        $dataTransform['description'] = isset($data['translation']['description'])? $data['translation']['description'] : '';
        $dataTransform['url'] = isset($data['url'])? $data['url'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail'])? asset(TOOLS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['is_rating'] = isset($data['rating'])? $data['rating'] : 0;
        $dataTransform['is_downloaded'] = isset($data['downloaded'])? $data['downloaded'] : 0;
        $dataTransform['tools_type'] = isset($data['tools_type'])? $data['tools_type'] : '';
        $dataTransform['country'] = isset($data['country'])? $data['country'] : '';
        $dataTransform['version'] = isset($data['version'])? $data['version'] : '';
        $dataTransform['platform'] = isset($data['platform'])? $data['platform'] : '';
        $dataTransform['manufacture'] = isset($data['manufacture'])? $data['manufacture'] : '';
        $dataTransform['file_size'] = isset($data['file_size'])? $data['file_size'] : '';

        return $dataTransform;
    }
}