<?php

namespace App\Services\Transformation\Front;

class GreenPagesCategory
{
    /**
     * Get Green Pages Transformation
     * @param $data
     * @return array
     */
    public function getGreenPagesCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setGreenPagesCategoryTransform($data);
    }

    public function getGreenPagesDetailTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setGreenPagesDetailTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setGreenPagesCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setGreenPagesDetailTransform($data)
    {
        $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';

        return $dataTransform;
    }
}