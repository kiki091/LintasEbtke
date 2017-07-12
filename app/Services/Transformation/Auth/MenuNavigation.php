<?php

namespace App\Services\Transformation\Auth;

class MenuNavigation
{
	/**
     * Get Menu Navigation Transformation
     * @param $data
     * @return array
     */
    public function getMenuNavigationCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setMenuNavigationCmsTransform($data);
    }

    /**
     * Set Menu Navigation Transformation
     * @param $data
     * @return array
     */

    protected function setMenuNavigationCmsTransform($data)
    {

        $dataTransform = array_map(function($data) {

            return [

                'id'            => isset($data['id']) ? $data['id'] : '',
                'title'         => isset($data['display_name']) ? $data['display_name'] : '',
                'slug'          => isset($data['slug']) ? $data['slug'] : '',
                'url'           => isset($data['url']) ? $data['url'] : '',
                'have_sub_menu' => isset($data['have_sub_menu']) ? $data['have_sub_menu'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : '',
                'menu_group'    => isset($data['menu_group']['title']) ? $data['menu_group']['title'] : '',
            ];

        },$data);

        $finalData = [];
        foreach ($dataTransform as $item) {
            $finalData[$item['menu_group']][] = $item;

        }

        return $finalData;
    }

}