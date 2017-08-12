<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\InvestasiPowerProducer as InvestasiPowerProducerInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\InvestasiPowerProducer as InvestasiPowerProducerModel;
use App\Services\Transformation\Sipeda\InvestasiPowerProducer as InvestasiPowerProducerTransformation;
use SipedaDataHelper;
use Carbon\Carbon;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class InvestasiPowerProducer extends BaseImplementation implements InvestasiPowerProducerInterface
{

    protected $message;
    protected $lastInsertId;
    protected $investasiPowerProducer;
    protected $investasiPowerProducerTransformation;

    function __construct(InvestasiPowerProducerModel $investasiPowerProducer, InvestasiPowerProducerTransformation $investasiPowerProducerTransformation)
    {

        $this->investasiPowerProducer = $investasiPowerProducer;
        $this->investasiPowerProducerTransformation = $investasiPowerProducerTransformation;
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
            "perusahaan_id" => SipedaDataHelper::sipedaId(),
            "order_by" => 'created_at',
        ];

        $investasiPowerProducerData = $this->investasiPowerProducer($params, 'desc', 'array', false);

        return $this->investasiPowerProducerTransformation->getInvestasiPowerProducerTransform($investasiPowerProducerData);
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

            $store = $this->investasiPowerProducer;

            if ($this->isEditMode($data)) {
                $store          = $this->investasiPowerProducer->find($data['id']);
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->created_at    = $this->mysqlDateTimeFormat();
            }

            $store->sumber_dana                 = isset($data['sumber_dana']) ? $data['sumber_dana'] : '';
            $store->status                      = isset($data['status']) ? $data['status'] : '';
            $store->tahun_investasi             = isset($data['tahun_investasi']) ? Carbon::parse($data['tahun_investasi'])->toDateString() : '';
            $store->penambahan_kapasitas        = isset($data['penambahan_kapasitas']) ? $data['penambahan_kapasitas'] : '';
            $store->penambahan_komponen        = isset($data['penambahan_komponen']) ? $data['penambahan_komponen'] : '';
            $store->peningkatan_efisiensi        = isset($data['peningkatan_efisiensi']) ? $data['peningkatan_efisiensi'] : '';
            $store->rencana_investasi           = isset($data['rencana_investasi']) ? $data['rencana_investasi'] : '';
            $store->realisasi_investasi         = isset($data['realisasi_investasi']) ? $data['realisasi_investasi'] : '';
            $store->proyek_power_producer_id    = isset($data['proyek_power_producer_id']) ? $data['proyek_power_producer_id'] : '';

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
     * Get All Data To Array
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function investasiPowerProducer($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $investasiPowerProducer = $this->investasiPowerProducer->with(['proyek_power_producer']);
        
        if(isset($params['perusahaan_id'])) {

            $investasiPowerProducer->whereHas('proyek_power_producer.perusahaan', function($q) use($params){

                $q->userId($params['perusahaan_id']);
            });
        }

        if(isset($params['id'])) {
            $investasiPowerProducer->id($params['id']);
        }

        if(isset($params['order'])) {
            $investasiPowerProducer->orderBy($params['order'], $orderType);
        }

        if(!$investasiPowerProducer->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $investasiPowerProducer->get()->toArray();
                } else {
                    return $investasiPowerProducer->first()->toArray();
                }
                break;
        }
    }
    

    /*
     * Update Mode true or false
     */
    
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }
}