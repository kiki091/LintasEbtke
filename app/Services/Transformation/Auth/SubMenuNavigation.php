<?php

namespace App\Services\Transformation\Auth;

class SubMenuNavigation
{
	/**
     * Get Menu Navigation Transformation
     * @param $data
     * @return array
     */
    public function getSubMenuNavigationCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSubMenuNavigationCmsTransform($data);
    }

    /**
     * Set Menu Navigation Transformation
     * @param $data
     * @return array
     */

    protected function setSubMenuNavigationCmsTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [

                'id'            => isset($data['id']) ? $data['id'] : '',
                'title'         => isset($data['title']) ? $data['title'] : '',
                'slug'          => isset($data['slug']) ? $data['slug'] : '',
                'url'           => isset($data['url']) ? $data['url'] : '',
                'menu_id'       => isset($data['menu_id']) ? $data['menu_id'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : '',
            ];

        },$data);

        return $dataTransform;
    }

}