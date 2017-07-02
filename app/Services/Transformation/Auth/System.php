<?php

namespace App\Services\Transformation\Auth;

class System
{
	/**
     * Get System Transformation
     * @param $data
     * @return array
     */
    public function getSystemCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSystemCmsTransform($data);
    }

    /**
     * Set System Transformation
     * @param $data
     * @return array
     */

    protected function setSystemCmsTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [

                'system_id'        => isset($data['id']) ? $data['id'] : '',
                'name'     => isset($data['name']) ? $data['name'] : '',
                'slug'      => isset($data['slug']) ? $data['slug'] : '',
            ];

        },$data);

        return $dataTransform;
    }

}