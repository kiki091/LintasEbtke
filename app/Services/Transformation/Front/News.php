<?php

namespace App\Services\Transformation\Front;

class News
{
	/**
     * Get News Transformation
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
     * Get News Detail Transformation
     * @param $data
     * @return array
     */

    public function getNewsDetailTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNewsDetailTransform($data);
    }

    /**
     * Get News Category Transformation
     * @param $data
     * @return array
     */

    public function getNewsCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNewsCategoryTransform($data);
    }

    /**
     * Get News By Category Transformation
     * @param $data
     * @return array
     */

    public function getNewsByCategory($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNewsByCategory($data);
    }

    /**
     * Set News Transformation
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
                
                'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'introduction' => isset($data['translation']['introduction']) ? str_limit($data['translation']['introduction'],400) : '',
                'total_view' => isset($data['total_view']) ? $data['total_view'] : '',
                'created_at' => isset($data['created_at']) ? date('d/m/Y g:i:s A', strtotime($data['created_at'])) : '',
                'created_at_home' => isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '',
                'days_ago' => isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set News Transformation
     * @param $data
     * @return array
     */
    protected function setNewsDetailTransform($data)
    {
        $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : DEFAULT_IMAGE_DIRECTORY;
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['introduction'] = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['description'] = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title'] = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword'] = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description'] = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        $dataTransform['total_view'] = isset($data['total_view']) ? $data['total_view'] : '';
        $dataTransform['created_at_home'] = isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '';
        $dataTransform['days_ago'] = isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '';

        $dataTransform['related']   = $this->getYouMighAlsoLike($data['related']);
        $dataTransform['image_slider']  = $this->getNewsImageSlider($data['news_images']);

        return $dataTransform;
    }

    /**
     * Set Image Slider
     * @param $data
     * @return array
     */

    protected function getNewsImageSlider($data)
    {
        $dataTransform = array_map(function($data) {
            return [
                'filename_url'  => isset($data['filename']) ? asset(NEWS_BANNER_DIRECTORY.rawurlencode($data['filename'])) : '',
            ];
        }, $data);

        return $dataTransform;
    }

    /**
     * Set You Migh Also Like Transformation
     * @param $data
     * @return array
     */

    protected function getYouMighAlsoLike($data) 
    {
        $dataTransform = array_map(function($data) {

            return [
                'related_thumbnail_url' => isset($data['related_news']['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['related_news']['thumbnail'])) : '',
                'related_slug'          => isset($data['related_news']['translation']['slug']) ? $data['related_news']['translation']['slug'] : '',
                'related_view'          => isset($data['related_news']['total_view']) ? $data['related_news']['total_view'] : '',
                'related_day_ago'          => isset($data['related_news']['created_at']) ?\Carbon\Carbon::createFromTimeStamp(strtotime($data['related_news']['created_at']))->diffForHumans() : '',

                'related_title'         => isset($data['related_news']['translation']['title']) ? $data['related_news']['translation']['title'] : '',
                'related_introduction'         => isset($data['related_news']['translation']['introduction']) ? $data['related_news']['translation']['introduction'] : '',
            ];
        },$data);

        return $dataTransform;
    }



    /**
     * Set News Category Transformation
     * @param $data
     * @return array
     */
    protected function setNewsCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : DEFAULT_IMAGE_DIRECTORY,
                
                'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }


    /**
     * Set News By Category Transformation
     * @param $data
     * @return array
     */
    protected function setNewsByCategory($data)
    {
        if(!is_array($data) || empty($data))
            return array();


        $dataTransform['tag_title']     = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['tag_slug']      = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['tag_introduction']     = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['thumbnail']     = isset($data['thumbnail']) ? $data['thumbnail'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['news']          = $this->setNewsDataByCategory($data['news']);
        
        return $dataTransform;
    }

    /**
     * Set News Data By Category Transformation
     * @param $data
     * @return array
     */

    protected function setNewsDataByCategory($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : DEFAULT_IMAGE_DIRECTORY,
                
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                'introduction' => isset($data['translation']['introduction']) ? str_limit($data['translation']['introduction'],300) : '',
                'total_view' => isset($data['total_view']) ? $data['total_view'] : '',
                'created_at' => isset($data['created_at']) ? date('d/m/Y g:i:s A', strtotime($data['created_at'])) : '',
                'created_at_home' => isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '',
                'days_ago' => isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '',
            ];
        }, $data);
        
        
        return $dataTransform;
    }
}