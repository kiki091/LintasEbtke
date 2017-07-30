<?php

namespace App\Services\Transformation\Sipeda;

class CapacityBuilding
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getCapacityBuildingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setCapacityBuildingTransform($data);
    }

    /**
     * Get Data For Edit Transformation
     * @param $data
     * @return array
     */
    public function getSingleForEditCapacityBuildingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditCapacityBuildingTransform($data);
    }

    /**
     * Set Data Transformation
     * @param $data
     * @return array
     */
    protected function setCapacityBuildingTransform($data)
    {
        $dataTransform = array_map(function($data) {

            return [
                'id'                => isset($data['id']) ? $data['id'] : '',
                'is_publish'        => isset($data['is_publish']) ? $data['is_publish'] : false,
                'topik_kegiatan'    => isset($data['topik_kegiatan']) ? $data['topik_kegiatan'] : '',
                'tahun_perencanaan' => isset($data['tahun_perencanaan']) ? $data['tahun_perencanaan'] : '',
                'tahun_pelaksanaan' => isset($data['tahun_pelaksanaan']) ? $data['tahun_pelaksanaan'] : '',
            ];
        },$data);

        return $dataTransform;
    }

    /**
     * Set Data For Edit Transformation
     * @param $data
     * @return array
     */
    protected function setSingleForEditCapacityBuildingTransform($data)
    {
        $dataTransform['id']                    = isset($data['id']) ? $data['id'] : '';
        $dataTransform['topik_kegiatan']        = isset($data['topik_kegiatan']) ? $data['topik_kegiatan'] : '';
        $dataTransform['request_topik']         = isset($data['request_topik']) ? $data['request_topik'] : '';
        $dataTransform['penyelenggara_kegiatan']= isset($data['penyelenggara_kegiatan']) ? $data['penyelenggara_kegiatan'] : '';
        $dataTransform['tahun_perencanaan']     = isset($data['tahun_perencanaan']) ? $data['tahun_perencanaan'] : '';
        $dataTransform['tahun_pelaksanaan']     = isset($data['tahun_pelaksanaan']) ? $data['tahun_pelaksanaan'] : '';
        $dataTransform['target_peserta']        = isset($data['target_peserta']) ? $data['target_peserta'] : '';
        $dataTransform['realisasi_peserta']     = isset($data['realisasi_peserta']) ? $data['realisasi_peserta'] : '';
        $dataTransform['sasaran_peserta']       = isset($data['sasaran_peserta']) ? $data['sasaran_peserta'] : '';
        $dataTransform['jenis_institusi_peserta'] = isset($data['jenis_institusi_peserta']) ? $data['jenis_institusi_peserta'] : '';
        $dataTransform['total_biaya']           = isset($data['total_biaya']) ? $data['total_biaya'] : '';
        $dataTransform['sumber_pendanaan']      = isset($data['sumber_pendanaan']) ? $data['sumber_pendanaan'] : '';
        $dataTransform['sertifikasi_kompetensi']= isset($data['sertifikasi_kompetensi']) ? $data['sertifikasi_kompetensi'] : '';
        $dataTransform['sumber_data']           = isset($data['sumber_data']) ? $data['sumber_data'] : '';
        $dataTransform['keterangan']            = isset($data['keterangan']) ? $data['keterangan'] : '';
        $dataTransform['lokasi_id']             = isset($data['lokasi_id']) ? $data['lokasi_id'] : '';
        $dataTransform['jenis_kegiatan_id']     = isset($data['jenis_kegiatan_id']) ? $data['jenis_kegiatan_id'] : '';

        return $dataTransform;
    }
}