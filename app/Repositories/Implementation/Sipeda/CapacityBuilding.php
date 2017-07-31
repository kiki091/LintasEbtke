<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\CapacityBuilding as CapacityBuildingInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\CapacityBuilding as CapacityBuildingModel;
use App\Custom\SipedaDataHelper;
use App\Services\Transformation\Sipeda\CapacityBuilding as CapacityBuildingTransformation;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class CapacityBuilding extends BaseImplementation implements CapacityBuildingInterface
{

    protected $message;
    protected $lastInsertId;
    protected $capacityBuilding;
    protected $capacityBuildingTransformation;

    function __construct(CapacityBuildingModel $capacityBuilding, CapacityBuildingTransformation $capacityBuildingTransformation)
    {

        $this->capacityBuilding = $capacityBuilding;
        $this->capacityBuildingTransformation = $capacityBuildingTransformation;
    }

	/**
     * Get Data
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function getData($params)
    {
        $params = [

            "order_by" => 'tahun_perencanaan',
        ];

        $capacityBuildingData = $this->capacityBuilding($params, 'desc', 'array', false);

        return $this->capacityBuildingTransformation->getCapacityBuildingTransform($capacityBuildingData);
    }

    

    /**
     * Store Data
     * @param $data
     * @return array
     */

    public function store($data)
    {
        try {

            DB::beginTransaction();
            
            if(!$this->storeData($data) == true)
            {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_success_store_data_general'), true);

        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Store Data into Database
     * @param $data
     */

    protected function storeData($data)
    {
        try {

            $store = $this->capacityBuilding;

            if ($this->isEditMode($data)) {
                $store          = $this->capacityBuilding->find($data['id']);
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_publish      = false;
                $store->created_at      = $this->mysqlDateTimeFormat();
                $store->perusahaan_id   = SipedaDataHelper::sipedaId();
            }

            $store->topik_kegiatan              = isset($data['topik_kegiatan']) ? $data['topik_kegiatan'] : '';
            $store->request_topik               = isset($data['request_topik']) ? $data['request_topik'] : '';
            $store->penyelenggara_kegiatan      = isset($data['penyelenggara_kegiatan']) ? $data['penyelenggara_kegiatan'] : '';
            $store->tahun_perencanaan           = isset($data['tahun_perencanaan']) ? $data['tahun_perencanaan'] : '';
            $store->tahun_pelaksanaan           = isset($data['tahun_pelaksanaan']) ? $data['tahun_pelaksanaan'] : '';
            $store->target_peserta              = isset($data['target_peserta']) ? $data['target_peserta'] : '';
            $store->realisasi_peserta           = isset($data['realisasi_peserta']) ? $data['realisasi_peserta'] : '';
            $store->sasaran_peserta             = isset($data['sasaran_peserta']) ? $data['sasaran_peserta'] : '';
            $store->jenis_institusi_peserta     = isset($data['jenis_institusi_peserta']) ? $data['jenis_institusi_peserta'] : '';
            $store->total_biaya                 = isset($data['total_biaya']) ? $data['total_biaya'] : '';
            $store->sumber_pendanaan            = isset($data['sumber_pendanaan']) ? $data['sumber_pendanaan'] : '';
            $store->sertifikasi_kompetensi      = isset($data['sertifikasi_kompetensi']) ? $data['sertifikasi_kompetensi'] : '';
            $store->sumber_data                 = isset($data['sumber_data']) ? $data['sumber_data'] : '';
            $store->keterangan                  = isset($data['keterangan']) ? $data['keterangan'] : '';
            $store->lokasi_id                   = isset($data['lokasi_id']) ? $data['lokasi_id'] : '';
            $store->jenis_kegiatan_id           = isset($data['jenis_kegiatan_id']) ? $data['jenis_kegiatan_id'] : '';

            if($save = $store->save())
            {
                $this->lastInsertId = $store->id;
            }

            return $save;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Get Data For Edit
     * @param $data
     */
    public function edit($data)
    {
        $params = [
            "id" => isset($data['id']) ? $data['id'] : '',
        ];

        $singleData = $this->capacityBuilding($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->capacityBuildingTransformation->getSingleForEditCapacityBuildingTransform($singleData));
    }
    
    /**
     * Change Status
     * @param $params
     * @return mixed
     */
    public function publish($data)
    {
        try {
            if (!isset($data['id']) && empty($data['id']))
                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $oldData = $this->capacityBuilding
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_publish' => $oldData['is_publish'] ? false : true,
            ];

            $publish = $this->capacityBuilding
                ->id($data['id'])
                ->update($updatedData);

            if($publish) {
                DB::commit();
                return $this->setResponse(trans('message.cms_success_update_status_general'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_update_status_general'), false);

        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Delete Data
     * @param $params
     * @return mixed
     */
    public function delete($data)
    {
        try {
            if (!isset($data['id']) && empty($data['id']))
                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $params = [

                "id" => $data['id']
            ];

            if (!$this->removeData($params)) {
                DB::rollback();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_success_delete_data_general'), true);

        } catch (\Exception $e) {
            DB::rollback();
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Remove Data From Database
     * @param $data
     * @return bool
     */
    protected function removeData($data)
    {
        try {

            $delete = $this->capacityBuilding
                ->id($data['id'])
                ->forceDelete();

            if ($delete)
                return true;

            $this->message = trans('message.cms_failed_delete_data_general');
            return false;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Get All Data To Array
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function capacityBuilding($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $capacityBuilding = $this->capacityBuilding->with(['perusahaan', 'lokasi', 'kegiatan']);

        if(isset($params['id'])) {
            $capacityBuilding->id($params['id']);
        }

        if(isset($params['lokasi_id'])) {
            $capacityBuilding->lokasiId($params['lokasi_id']);
        }

        if(isset($params['jenis_kegiatan_id'])) {
            $capacityBuilding->kegiatanId($params['jenis_kegiatan_id']);
        }

        if(isset($params['is_publish'])) {
            $capacityBuilding->isPublish($params['is_publish']);
        }

        if(isset($params['order'])) {
            $capacityBuilding->orderBy($params['order'], $orderType);
        }

        if(!$capacityBuilding->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $capacityBuilding->get()->toArray();
                } else {
                    return $capacityBuilding->first()->toArray();
                }
                break;
        }
    }
}