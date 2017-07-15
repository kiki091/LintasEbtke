<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;

class ContactUs
{
	/**
     * get Data 
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    public function getContactUsCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setContactUsCmsTransform($data);
    }

    /**
     * Get Singl Data Transformation
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */
    public function getSingleContactUsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleContactUsTransform($data);
    }

    /**
     * Set Data
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    protected function setContactUsCmsTransform($data)
    {
    	$dataTranform = array_map(function($data)
        {
            return [
                'id'            => isset($data['id']) ? $data['id'] : '',
                'email'         => isset($data['email']) ? $data['email'] : '',
                'fullname'      => isset($data['fullname']) ? $data['fullname'] : '',
                
            ];
        }, $data);

        return $dataTranform;
    }

    /**
     * Set Single Data
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    protected function setSingleContactUsTransform($data)
    {
        $dataTransform['id']        = isset($data['id']) ? $data['id'] : '';
        $dataTransform['email']     = isset($data['email']) ? $data['email'] : '';
        $dataTransform['fullname']  = isset($data['fullname']) ? $data['fullname'] : '';
        $dataTransform['question']  = isset($data['question']) ? $data['question'] : '';
        $dataTransform['message']   = isset($data['message']) ? $data['message'] : '';

        return $dataTransform;
    }

}