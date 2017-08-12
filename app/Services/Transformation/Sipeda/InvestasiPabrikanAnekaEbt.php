<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class InvestasiPabrikanAnekaEbt
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getInvestasiPabrikanAnekaEbtTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setInvestasiPabrikanAnekaEbtTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setInvestasiPabrikanAnekaEbtTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                          => isset($data['id']) ? $data['id'] : '',
                'nama_produk'                 => isset($data['nama_produk']) ? $this->getProdukInvestasiPabrikanAnekaEbt($data['nama_produk']) : '',
                'sumber_dana'                 => isset($data['sumber_dana']) ? $data['sumber_dana'] : '',
                'provinsi'                    => isset($data['provinsi_id']) ? $data['provinsi']['name'] : '',
                'kabupaten'                   => isset($data['kabupaten_id']) ? $data['kabupaten']['name'] : '',
                'latitude'                    => isset($data['latitude']) ? $data['latitude'] : '',
                'longitude'                   => isset($data['longitude']) ? $data['longitude'] : '',
                'kapasitas_produksi'          => isset($data['kapasitas_produksi']) ? $data['kapasitas_produksi'] : '',
                'satuan_kapasitas_produksi'   => isset($data['satuan_kapasitas_produksi']) ? $data['satuan_kapasitas_produksi'] : '',
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

    protected function getProdukInvestasiPabrikanAnekaEbt($data)
    {
        switch ($data) {
            case '1':
                $returnData = 'Module Surya';
                break;
            case '2':
                $returnData = 'Baterei VRLA';
                break;
            case '3':
                $returnData = 'Baterei Lithium';
                break;
            case '4':
                $returnData = 'Baterei Zinc Cair';
                break;
            case '5':
                $returnData = 'Inverter';
                break;
            case '6':
                $returnData = 'Controller';
                break;
            case '7':
                $returnData = 'Turbin Air';
                break;
            case '8':
                $returnData = 'Turbin Angin';
                break;
            default:
                # code...
                break;
        }

        return $returnData;
    }
}