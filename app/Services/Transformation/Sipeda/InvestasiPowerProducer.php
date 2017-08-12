<?php

namespace App\Services\Transformation\Sipeda;

use Carbon\Carbon;

class InvestasiPowerProducer
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getInvestasiPowerProducerTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setInvestasiPowerProducerTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setInvestasiPowerProducerTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                    => isset($data['id']) ? $data['id'] : '',
                'nama_proyek'           => isset($data['proyek_power_producer']['nama_proyek']) ? $data['proyek_power_producer']['nama_proyek'] : false,
                'sumber_dana'           => isset($data['sumber_dana']) ? $data['sumber_dana'] : '',
                'kapasitas_terpasang'   => isset($data['proyek_power_producer']['kapasitas_terpasang']) ? $data['proyek_power_producer']['kapasitas_terpasang'] : '',
                'status'                => isset($data['status']) ? $this->getStatusInvestasiPowerProducer($data['status']) : '',
                'tahun_investasi'       => isset($data['tahun_investasi']) ? Carbon::parse($data['tahun_investasi'])->toFormattedDateString() : '',
                'penambahan_kapasitas'  => isset($data['penambahan_kapasitas']) ? $data['penambahan_kapasitas'] : '',
                'penambahan_komponen'   => isset($data['penambahan_komponen']) ? $data['penambahan_komponen'] : '',
                'peningkatan_efisiensi' => isset($data['peningkatan_efisiensi']) ? $data['peningkatan_efisiensi'] : '',
                'rencana_investasi'     => isset($data['rencana_investasi']) ? $data['rencana_investasi'] : '',
                'realisasi_investasi'   => isset($data['realisasi_investasi']) ? $data['realisasi_investasi'] : '',
            ];
        },$data);

        return $dataTransform;
    }

    protected function getStatusInvestasiPowerProducer($data)
    {
        switch ($data) {
            case '1':
                $returnData = 'Izin Usaha Penyediaan Tenaga Listrik Sementara';
                break;
            case '2':
                $returnData = 'Perjanjian Jual Beli Listrik';
                break;
            case '3':
                $returnData = 'Financial Close';
                break;
            case '4':
                $returnData = 'Izin Usaha Penyediaan Tenaga Listrik';
                break;
            case '5':
                $returnData = 'Pelaksanaan Pembangunan';
                break;
            case '6':
                $returnData = 'Commercial Operation date (COD)';
                break;
            default:
                # code...
                break;
        }

        return $returnData;
    }
}