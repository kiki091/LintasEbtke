<?php

namespace App\Services\Transformation\Sipeda;

class ProyekPowerProducer
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getProyekPowerProducerTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setProyekPowerProducerTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setProyekPowerProducerTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                    => isset($data['id']) ? $data['id'] : '',
                'nama_proyek'           => isset($data['nama_proyek']) ? $data['nama_proyek'] : false,
                'kapasitas_terpasang'   => isset($data['kapasitas_terpasang']) ? $data['kapasitas_terpasang'] : '',
                'cod'                   => isset($data['cod']) ? $data['cod'] : '',
            ];
        },$data);

        return $dataTransform;
    }
}