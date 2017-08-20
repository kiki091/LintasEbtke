<?php

namespace App\Services\Transformation\Front;

class Event
{
	/**
     * Get Event Transformation
     * @param $data
     * @return array
     */
    public function getEventTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEventTransform($data);
    }
    /**
     * Get Event Transformation
     * @param $data
     * @return array
     */
    public function getEventByMonthTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEventByMonthTransform($data);
    }

    public function getEventDetailTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEventDetailTransform($data);
    }

    /**
     * Set Event Transformation
     * @param $data
     * @return array
     */
    protected function setEventTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'start' => isset($data['date_start']) ? date('c', strtotime($data['date_start'])) : '',
                'end' => isset($data['date_end']) ? date('c', strtotime($data['date_end'])) : '',
                'event_url' => isset($data['translation']['slug']) ? route('detailEvent',$data['translation']['slug']) : '',
                'start_reformat' => isset($data['date_start']) ? $this->setReformatStartEndDate($data['date_start'], $data['date_end']) : '',

                'introduction' => isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '',
            ];
        }, $data);
        
        return json_encode($dataTransform);
    }


    /**
     * Set Event Transformation
     * @param $data
     * @return array
     */
    protected function setEventByMonthTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'date_start' => isset($data['date_start']) ? \Carbon\Carbon::parse($data['date_start']) : '',
                'date_end' => isset($data['date_end']) ? \Carbon\Carbon::parse($data['date_end']) : '',
                'start' => isset($data['date_start']) ? date('c', strtotime($data['date_start'])) : '',
                'end' => isset($data['date_end']) ? date('c', strtotime($data['date_end'])) : '',
                'event_url' => isset($data['translation']['slug']) ? route('detailEvent',$data['translation']['slug']) : '',
                'start_reformat' => isset($data['date_start']) ? $this->setReformatStartEndDate($data['date_start'], $data['date_end']) : '',

                'introduction' => isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set Event Transformation
     * @param $data
     * @return array
     */
    protected function setEventDetailTransform($data)
    {
        $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(EVENT_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['introduction'] = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['description'] = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title'] = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword'] = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description'] = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        $dataTransform['total_view'] = isset($data['total_view']) ? $data['total_view'] : '';
        $dataTransform['created_at_home'] = isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '';
        $dataTransform['days_ago'] = isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '';

        $dataTransform['image_slider']  = $this->getEventImageSlider($data['event_images']);

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
                'filename_url'  => isset($data['filename']) ? asset(EVENT_IMAGES_DIRECTORY.rawurlencode($data['filename'])) : '',
            ];
        }, $data);

        return $dataTransform;
    }

    /**
     * @param $start
     * @param $end
     * @return false|string
     */
    public function setReformatStartEndDate($start, $end)
    {
        $_start = date('d M Y', strtotime($start));
        $_end   = date('d M Y', strtotime($end));

        if($_start == $_end) {
            return date('l, d M Y', strtotime($start));
        } else {
            return date('l, d M Y', strtotime($start))  . ' - ' . date('l, d M Y', strtotime($_end));
        }
    }
}