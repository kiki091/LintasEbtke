<?php

namespace App\Services\Transformation\Front;

class NreccEvents
{
	/**
     * Get NreccEvents Transformation
     * @param $data
     * @return array
     */
    public function getNreccEventsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNreccEventsTransform($data);
    }

    /**
     * Get NreccEvents Transformation Detail
     * @param $data
     * @return array
     */
    public function getNreccEventsDetailTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNreccEventsDetailTransform($data);
    }

    /**
     * Set Event Transformation
     * @param $data
     * @return array
     */
    protected function setNreccEventsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                
                'title'             => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug'              => isset($data['translation']['slug']) ? route('detailEvent',$data['translation']['slug']) : '',
                'thumbnail_url'     => isset($data['thumbnail']) ? asset(NRECC_INSTITUTION_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',

                'introduction'      => isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '',
                'date_start'        => isset($data['date_start']) ? date('M d, Y', strtotime($data['date_start'])) : '',
                'date_end'          => isset($data['date_end']) ? date('M d, Y', strtotime($data['date_end'])) : '',
                'total_view'        => isset($data['total_view']) ? $data['total_view'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set Detail Transformation
     * @param $data
     * @return array
     */
    protected function setNreccEventsDetailTransform($data)
    {
        $dataTransform['locale']             = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['category_title']     = isset($data['category']['translation']['title']) ? $data['category']['translation']['title'] : '';
        $dataTransform['title']              = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['thumbnail_url']      = isset($data['thumbnail']) ? asset(NRECC_RESOURCES_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['filename_url']       = isset($data['filename']) ? asset(NRECC_RESOURCES_IMAGES_DIRECTORY.rawurlencode($data['filename'])) : '';
        $dataTransform['slug']               = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['introduction']       = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['side_description']   = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';
        $dataTransform['description']        = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title']         = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword']       = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description']   = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        $dataTransform['total_view']         = isset($data['total_view']) ? $data['total_view'] : '';
        $dataTransform['created_at_home']    = isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '';
        $dataTransform['days_ago']           = isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '';

        $dataTransform['image_slider']       = isset($data['images']) ? $this->getEventImageSlider($data['images']) : '';
        return $dataTransform;
    }


    /**
     * Set Image Slider
     * @param $data
     * @return array
     */

    protected function getEventImageSlider($data)
    {
        $dataTransform = array_map(function($data) {
            return [
                'filename_url'  => isset($data['filename']) ? asset(NRECC_RESOURCES_IMAGES_DIRECTORY.rawurlencode($data['filename'])) : '',
            ];
        }, $data);

        return $dataTransform;
    }
}