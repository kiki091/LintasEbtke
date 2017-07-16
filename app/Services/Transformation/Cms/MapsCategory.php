<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;
use Carbon\Carbon;

class MapsCategory
{
	/**
     * @param $data
     * @return array
     */
    public function getMapsCategoryCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setMapsCategoryCmsTransform($data);
    }


    /**
     * @param $data
     * @return array
     */
    protected function setMapsCategoryCmsTransform($data)
    {
        

        $dataTransform = array_map(function($data) {

            return [
                
                'id'            => isset($data['id']) ? $data['id'] : '',
                'title'         => isset($data['translation']['title']) ? $data['translation']['title'] : '',
            ];
        },$data);
        
        return $dataTransform;
    }

}