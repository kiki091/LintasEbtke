<?php

namespace App\Services\Transformation\Front;

class MainBanner
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getMainBannerTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setMainBannerTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setMainBannerTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'image' => isset($data['filename']) ? $data['filename'] : '',
                'image_url' => isset($data['filename']) ? asset(MAIN_BANNER_TRANS_IMAGE_DIRECTORY.rawurlencode($data['filename'])) : DEFAULT_IMAGE_DIRECTORY,
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'description' => isset($data['translation']['description']) ? $data['translation']['description'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }
}