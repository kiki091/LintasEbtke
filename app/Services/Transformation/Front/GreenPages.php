<?php

namespace App\Services\Transformation\Front;

class GreenPages
{
    /**
     * Get Green Pages Transformation
     * @param $data
     * @return array
     */
    public function getGreenPagesTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setGreenPagesTransform($data);
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
    protected function setGreenPagesTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
                
                'office_name' => isset($data['office_name']) ? $data['office_name'] : '',
                'slug' => isset($data['slug']) ? $data['slug'] : '',
                'introduction' => isset($data['translation']['introduction']) ? str_limit($data['translation']['introduction'],150) : '',
                'created_at' => isset($data['created_at']) ? date('d/m/Y g:i:s A', strtotime($data['created_at'])) : '',
                'created_at_home' => isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '',
                'days_ago' => isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '',
                'category'  => isset($data['category']['translation']['title']) ? $data['category']['translation']['title'] : '',
                'slug_category'  => isset($data['category']['translation']['slug']) ? $data['category']['translation']['slug'] : '',
            ];
        }, $data);

        return $dataTransform;
    }

    /**
     * Set Green Pages Category Transformation
     * @param $data
     * @return array
     */
    
    protected function getGreenPagesCategory($data)
    {
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';

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
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['office_name'] = isset($data['office_name']) ? $data['office_name'] : '';
        $dataTransform['slug'] = isset($data['slug']) ? $data['slug'] : '';
        $dataTransform['phone_number'] = isset($data['phone_number']) ? $data['phone_number'] : '';
        $dataTransform['fax_number'] = isset($data['fax_number']) ? $data['fax_number'] : '';
        $dataTransform['email'] = isset($data['email']) ? $data['email'] : '';
        $dataTransform['postal_code'] = isset($data['postal_code']) ? $data['postal_code'] : '';
        $dataTransform['introduction'] = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['description'] = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title'] = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword'] = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description'] = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        $dataTransform['created_at_home'] = isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '';
        $dataTransform['days_ago'] = isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '';
        
        $dataTransform['slider_images']   = $this->getGreenPagesImageSlider($data['images']);

        return $dataTransform;
    }


    /**
     * Set Image Slider
     * @param $data
     * @return array
     */

    protected function getGreenPagesImageSlider($data)
    {
        $dataTransform = array_map(function($data) {
            return [
                'filename_url'  => isset($data['filename']) ? asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.rawurlencode($data['filename'])) : '',
            ];
        }, $data);

        return $dataTransform;
    }
}