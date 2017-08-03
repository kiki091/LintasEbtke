<?php

namespace App\Services\Transformation\Auth;

class MenuGroup
{
	/**
     * Get Menu Group Transformation
     * @param $data
     * @return array
     */
    public function getMenuGroupCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setMenuGroupCmsTransform($data);
    }

    /**
     * Set Menu Group Transformation
     * @param $data
     * @return array
     */

    protected function setMenuGroupCmsTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [

                'id'        => isset($data['id']) ? $data['id'] : '',
                'title'     => isset($data['title']) ? $data['title'] : '',
                'icon'      => isset($data['icon']) ? $data['icon'] : '',
                'is_active' => isset($data['is_active']) ? $data['is_active'] : '',
            ];

        },$data);

        return $dataTransform;
    }

}