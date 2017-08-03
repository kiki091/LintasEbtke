<?php

namespace App\Services\Transformation\Front;

class Seo
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getSeoTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSeoTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setSeoTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform['key']               = isset($data['key']) ? $data['key'] : '';
        $dataTransform['locale']            = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['meta_title']        = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword']      = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description']  = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        
        return $dataTransform;
    }
}