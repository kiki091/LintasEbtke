<?php

namespace App\Services\Transformation\Auth;

class Privilage
{
	/**
     * Get Privilage Transformation
     * @param $data
     * @return array
     */
    public function getPrivilageCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setPrivilageCmsTransform($data);
    }

    /**
     * Set Privilage Transformation
     * @param $data
     * @return array
     */

    protected function setPrivilageCmsTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [

                'privilage_id'        => isset($data['id']) ? $data['id'] : '',
                'name'     => isset($data['name']) ? $data['name'] : '',
                'display_name'      => isset($data['display_name']) ? $data['display_name'] : '',
                'description' => isset($data['description']) ? $data['description'] : '',
            ];

        },$data);

        return $dataTransform;
    }

}