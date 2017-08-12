<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\ProyekPowerProducer as ProyekPowerProducerInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\ProyekPowerProducer as ProyekPowerProducerModel;
use SipedaDataHelper;
use Carbon\Carbon;
use App\Services\Transformation\Sipeda\ProyekPowerProducer as ProyekPowerProducerTransformation;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class ProyekPowerProducer extends BaseImplementation implements ProyekPowerProducerInterface
{

    protected $message;
    protected $lastInsertId;
    protected $proyekPowerProducer;
    protected $proyekPowerProducerTransformation;

    function __construct(ProyekPowerProducerModel $proyekPowerProducer, ProyekPowerProducerTransformation $proyekPowerProducerTransformation)
    {

        $this->proyekPowerProducer = $proyekPowerProducer;
        $this->proyekPowerProducerTransformation = $proyekPowerProducerTransformation;
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

            "order_by" => 'created_at',
        ];

        $proyekPowerProducerData = $this->proyekPowerProducer($params, 'desc', 'array', false);

        return $this->proyekPowerProducerTransformation->getProyekPowerProducerTransform($proyekPowerProducerData);
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

            $store = $this->proyekPowerProducer;

            if ($this->isEditMode($data)) {
                $store          = $this->proyekPowerProducer->find($data['id']);
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->perusahaan_id           = SipedaDataHelper::sipedaId();
                $store->created_at              = $this->mysqlDateTimeFormat();
            }

            $store->provinsi_id                 = isset($data['provinsi_id']) ? $data['provinsi_id'] : '';
            $store->kabupaten_id                = isset($data['kabupaten_id']) ? $data['kabupaten_id'] : '';
            $store->kecamatan_id                = isset($data['kecamatan_id']) ? $data['kecamatan_id'] : '';
            $store->desa_id                     = isset($data['desa_id']) ? $data['desa_id'] : '';
            $store->nama_proyek                 = isset($data['nama_proyek']) ? $data['nama_proyek'] : '';
            $store->jenis_pembangkit            = isset($data['jenis_pembangkit']) ? $data['jenis_pembangkit'] : '';
            $store->latitude                    = isset($data['latitude']) ? $data['latitude'] : '';
            $store->longitude                   = isset($data['longitude']) ? $data['longitude'] : '';
            $store->kapasitas_terpasang         = isset($data['kapasitas_terpasang']) ? $data['kapasitas_terpasang'] : '';
            $store->produksi_energi_tahunan     = isset($data['produksi_energi_tahunan']) ? $data['produksi_energi_tahunan'] : '';
            $store->sharing_equity              = isset($data['sharing_equity']) ? $data['sharing_equity'] : '';
            $store->jenis_energy_primer         = isset($data['jenis_energy_primer']) ? $data['jenis_energy_primer'] : '';
            $store->cod                         = isset($data['cod']) ? Carbon::parse($data['cod'])->toDateString() : '';
            $store->kontrak_pln                 = isset($data['kontrak_pln']) ? $data['kontrak_pln'] : '';

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
    protected function proyekPowerProducer($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $proyekPowerProducer = $this->proyekPowerProducer->with(['perusahaan']);

        if(isset($params['id'])) {
            $proyekPowerProducer->id($params['id']);
        }

        if(isset($params['order'])) {
            $proyekPowerProducer->orderBy($params['order'], $orderType);
        }

        if(!$proyekPowerProducer->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $proyekPowerProducer->get()->toArray();
                } else {
                    return $proyekPowerProducer->first()->toArray();
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