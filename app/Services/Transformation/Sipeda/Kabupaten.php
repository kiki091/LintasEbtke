<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class Kabupaten
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getKabupatenTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setKabupatenTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setKabupatenTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                    => isset($data['id']) ? $data['id'] : '',
                'nama_kabupaten'           => isset($data['name']) ? $data['name'] : '',
            ];
        },$data);

        return $dataTransform;
    }
}