<?php

namespace App\Services\Transformation\Auth;

class Users
{
	/**
     * Get Auth Session Transformation
     * @param $data
     * @return array
     */
    public function getAuthSessionTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setAuthSessionTransform($data);
    }

    /**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getUserTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setUserTransform($data);
    }

    /**
     * Get Single Data User For Edit Transformation
     * @param $data
     * @return array
     */
    public function getSingleUserEditTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleUserEditTransform($data);
    }

    /**
     * Set Auth Session Transformation
     * @param $data
     * @return array
     */
    protected function setAuthSessionTransform($data)
    {
        $dataTransform['user_id']               = isset($data['id']) ? $data['id'] : '';
        $dataTransform['name']                  = isset($data['name']) ? $data['name'] : '';
        $dataTransform['email']                 = isset($data['email']) ? $data['email'] : '';
        $dataTransform['user_privilage']        = $this->setUserRole($data['role']);
        $dataTransform['user_menu']             = $this->setMenuUser($data['user_menu']);
        $dataTransform['user_location']         = $this->setUserLocation($data['location']);
        $dataTransform['system_location']       = $this->setSystemLocationUser($data['system_location']);
        
        return $dataTransform;
    }

    /**
     * Set Auth Role Transformation
     * @param $data
     * @return array
     */

    protected function setUserRole($data)
    {
        $dataTransform = array_map(function($data) {
            return [
                'role_id'   => isset($data['privilage']['id']) ? $data['privilage']['id'] : '',
                'role_name' => isset($data['privilage']['name']) ? $data['privilage']['name'] : '',
                'role_description' => isset($data['privilage']['description']) ? $data['privilage']['description'] : '',
            ];
        },$data);
        
        return $dataTransform;
    }

    /**
     * Set Auth Menu Access Transformation
     * @param $data
     * @return array
     */

    protected function setMenuUser($data)
    {
        $dataTransform = array_map(function($data) {
            return [
                'menu_group'    => isset($data['menu']['menu_group']['title'])? $data['menu']['menu_group']['title'] : '',
                'menu_group_icon'    => isset($data['menu']['menu_group']['icon'])? $data['menu']['menu_group']['icon'] : '',
                'user_id'       => isset($data['user_id'])? $data['user_id'] : '',
                'menu_id'       => isset($data['menu_id'])? $data['menu_id'] : '',
                'title'         => isset($data['menu']['title'])? $data['menu']['title'] : '',
                'slug'          => isset($data['menu']['slug'])? $data['menu']['slug'] : '',
                'url'           => isset($data['menu']['url'])? $data['menu']['url'] : '',
                'have_sub_menu' => isset($data['menu']['have_sub_menu'])? $data['menu']['have_sub_menu'] : '',
                'sub_menu'      => $this->getSubMenu($data['menu']['sub_menu']),

            ];
        }, $data);



        $finalData = [];
        foreach ($dataTransform as $item) {
            $finalData[$item['menu_group']][$item['menu_group_icon']][] = $item;

        }
        
        return $finalData;
    }

    /**
     * Get Sub Menu Transformation
     * @param $data
     * @return array
     */

    protected function getSubMenu($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'title_sub_menu'    => isset($data['title']) ? $data['title'] : '',
                'slugh_sub_menu'    => isset($data['slug']) ? $data['slug'] : '',
                'url_sub_menu'      => isset($data['url']) ? $data['url'] : '',

            ];
        }, $data);

        return $dataTransform;
    }

    /**
     * Set Auth Location Access Transformation
     * @param $data
     * @return array
     */

    protected function setUserLocation($data)
    {
        $dataTransform['name'] = isset($data['name']) ? $data['name'] : '';
        $dataTransform['slug'] = isset($data['slug']) ? $data['slug'] : '';

        return $dataTransform;
    }

    /**
     * Set System Location User Transformation
     * @param $data
     * @return array
     */

    protected function setSystemLocationUser($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'system_name'    => isset($data['system']['name']) ? $data['system']['name'] : '',
                'system_slug'    => isset($data['system']['slug']) ? $data['system']['slug'] : '',
            ];
            
        }, $data);

        return $dataTransform;
    }

    /**
     * Set User Transform
     * @param array
     * @return array
     */

    protected function setUserTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'            => isset($data['id']) ? $data['id'] : '',
                'name'          => isset($data['name']) ? $data['name'] : '',
                'email'         => isset($data['email']) ? $data['email'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : '',
            ];
            
        }, $data);

        return $dataTransform;
    }

    /**
     * Set Single Data User For Edit Transformation
     * @param $data
     * @return array
     */

    protected function setSingleUserEditTransform($data)
    {
        $dataTransform['id']             =   isset($data['id']) ? $data['id'] : '';
        $dataTransform['name']           =   isset($data['name']) ? $data['name'] : '';
        $dataTransform['email']          =   isset($data['email']) ? $data['email'] : '';
        $dataTransform['location_id']    =   isset($data['location_id']) ? $data['location_id'] : '';
        
        return $dataTransform;
    }
}