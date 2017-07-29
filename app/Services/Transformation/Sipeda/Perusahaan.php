<?php

namespace App\Services\Transformation\Sipeda;

class Perusahaan
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
     * Set Auth Session Transformation
     * @param $data
     * @return array
     */
    protected function setAuthSessionTransform($data)
    {
        $dataTransform['user_id']               = isset($data['id']) ? $data['id'] : '';
        $dataTransform['nama_perusahaan']       = isset($data['nama_perusahaan']) ? $data['nama_perusahaan'] : '';
        $dataTransform['email']                 = isset($data['email']) ? $data['email'] : '';
        $dataTransform['sipeda_privilage']      = $this->setUserRole($data['role_perusahaan']);
        
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
                'role_id'   => isset($data['sipeda_privilage']['id']) ? $data['sipeda_privilage']['id'] : '',
                'role_name' => isset($data['sipeda_privilage']['name']) ? $data['sipeda_privilage']['name'] : '',
                'role_description' => isset($data['sipeda_privilage']['description']) ? $data['sipeda_privilage']['description'] : '',
            ];
        },$data);
        
        return $dataTransform;
    }
}