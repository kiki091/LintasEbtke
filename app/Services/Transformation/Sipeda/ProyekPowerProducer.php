<?php

namespace App\Services\Transformation\Sipeda;
use Carbon\Carbon;

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
                'id'                        => isset($data['id']) ? $data['id'] : '',
                'nama_proyek'               => isset($data['nama_proyek']) ? $data['nama_proyek'] : '',
                'latitude'                  => isset($data['latitude']) ? $data['latitude'] : '',
                'longitude'                 => isset($data['longitude']) ? $data['longitude'] : '',
                'kapasitas_terpasang'       => isset($data['kapasitas_terpasang']) ? $data['kapasitas_terpasang'] : '',
                'produksi_energi_tahunan'   => isset($data['produksi_energi_tahunan']) ? $data['produksi_energi_tahunan'] : '',
                'cod'                   => isset($data['cod']) ? Carbon::parse($data['cod'])->toFormattedDateString() : '',
            ];
        },$data);

        return $dataTransform;
    }
}