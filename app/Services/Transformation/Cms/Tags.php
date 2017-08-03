<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;

class Tags
{
	/**
     * @param $data
     * @return array
     */
    public function getTagsCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setTagsCmsTransform($data);
    }

    /**
     * @param $data
     * @return array
     */
    protected function setTagsCmsTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [

                'id'            => isset($data['id']) ? $data['id'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : '',
                'title'         => isset($data['translation']['title']) ? $data['translation']['title'] : '',
            ];

        }, $data);

        return $dataTransform;
    }
}