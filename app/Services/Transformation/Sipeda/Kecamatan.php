<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class Kecamatan
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getKecamatanTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setKecamatanTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setKecamatanTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                    => isset($data['id']) ? $data['id'] : '',
                'nama_kecamatan'        => isset($data['name']) ? $data['name'] : '',
            ];
        },$data);

        return $dataTransform;
    }
}