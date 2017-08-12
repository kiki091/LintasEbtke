<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class InvestasiPltsRooftop
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getInvestasiPltsRooftopTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setInvestasiPltsRooftopTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setInvestasiPltsRooftopTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                          => isset($data['id']) ? $data['id'] : '',
                'nama_pemilik'                => isset($data['nama_pemilik']) ? $data['nama_pemilik'] : '',
                'sumber_dana'                 => isset($data['sumber_dana']) ? $data['sumber_dana'] : '',
                'provinsi'                    => isset($data['provinsi_id']) ? $data['provinsi']['name'] : '',
                'kabupaten'                   => isset($data['kabupaten_id']) ? $data['kabupaten']['name'] : '',
                'latitude'                    => isset($data['latitude']) ? $data['latitude'] : '',
                'longitude'                   => isset($data['longitude']) ? $data['longitude'] : '',
                'kapasitas_plts'              => isset($data['kapasitas_plts']) ? $data['kapasitas_plts'] : '',
                'tahun_investasi'             => isset($data['tahun_investasi']) ? $data['tahun_investasi'] : '',
                'penambahan_kapasitas'        => isset($data['penambahan_kapasitas']) ? $data['penambahan_kapasitas'] : '',
                'penambahan_komponen'         => isset($data['penambahan_komponen']) ? $data['penambahan_komponen'] : '',
                'peningkatan_efisiensi'       => isset($data['peningkatan_efisiensi']) ? $data['peningkatan_efisiensi'] : '',
                'rencana_investasi'           => isset($data['rencana_investasi']) ? $data['rencana_investasi'] : '',
                'realisasi_investasi'         => isset($data['realisasi_investasi']) ? $data['realisasi_investasi'] : '',
            ];
        },$data);

        return $dataTransform;
    }
}