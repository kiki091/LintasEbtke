<?php

namespace App\Services\Transformation\Front;

class WhitePaper
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getPapaersTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setPapaersTransform($data);
    }

    /**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getSinglePapaersTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSinglePapaersTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setPapaersTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'description' => isset($data['translation']['description']) ? str_limit($data['translation']['description'],350) : '',
                'slug' => isset($data['slug']) ? $data['slug'] : '',
                'file_url' => isset($data['file']) ? asset(PAPERS_FILE_DIRECTORY.rawurlencode($data['file'])) : '',
                'is_downloaded' => isset($data['downloaded']) ? $data['downloaded'] : 0,
                'is_rating' => isset($data['rating']) ? $data['rating'] : 0,
                'thumbnail_url' => isset($data['thumbnail']) ? asset(PAPERS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    protected function setSinglePapaersTransform($data)
    {
        $dataTransform['title'] = isset($data['translation']['title'])? $data['translation']['title'] : '';
        $dataTransform['description'] = isset($data['translation']['description'])? $data['translation']['description'] : '';
        $dataTransform['file_url'] = isset($data['file'])? asset(PAPERS_FILE_DIRECTORY.rawurlencode($data['file'])) : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail'])? asset(PAPERS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['is_rating'] = isset($data['rating'])? $data['rating'] : 0;
        $dataTransform['is_downloaded'] = isset($data['downloaded'])? $data['downloaded'] : 0;

        return $dataTransform;
    }
}