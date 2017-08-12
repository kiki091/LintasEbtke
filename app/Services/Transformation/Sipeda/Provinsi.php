<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class Provinsi
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getProvinsiTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setProvinsiTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setProvinsiTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                    => isset($data['id']) ? $data['id'] : '',
                'nama_provinsi'         => isset($data['name']) ? $data['name'] : '',
            ];
        },$data);

        return $dataTransform;
    }
}