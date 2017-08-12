<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class Desa
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getDesaTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setDesaTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setDesaTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'               => isset($data['id']) ? $data['id'] : '',
                'nama_desa'        => isset($data['name']) ? $data['name'] : '',
            ];
        },$data);

        return $dataTransform;
    }
}