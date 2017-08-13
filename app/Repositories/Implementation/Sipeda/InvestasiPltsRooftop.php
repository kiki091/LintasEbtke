<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\InvestasiPltsRooftop as InvestasiPltsRooftopInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\InvestasiPltsRooftop as InvestasiPltsRooftopModel;
use App\Services\Transformation\Sipeda\InvestasiPltsRooftop as InvestasiPltsRooftopTransformation;
use SipedaDataHelper;
use Carbon\Carbon;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class InvestasiPltsRooftop extends BaseImplementation implements InvestasiPltsRooftopInterface
{

    protected $message;
    protected $lastInsertId;
    protected $investasiPltsRooftop;
    protected $investasiPltsRooftopTransformation;

    function __construct(InvestasiPltsRooftopModel $investasiPltsRooftop, InvestasiPltsRooftopTransformation $investasiPltsRooftopTransformation)
    {

        $this->investasiPltsRooftop = $investasiPltsRooftop;
        $this->investasiPltsRooftopTransformation = $investasiPltsRooftopTransformation;
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

        $investasiPltsRooftopData = $this->investasiPltsRooftop($params, 'desc', 'array', false);

        return $this->investasiPltsRooftopTransformation->getInvestasiPltsRooftopTransform($investasiPltsRooftopData);
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

            $store = $this->investasiPltsRooftop;

            if ($this->isEditMode($data)) {
                $store          = $this->investasiPltsRooftop->find($data['id']);
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
                $store->perusahaan_id           = SipedaDataHelper::sipedaId();
                $store->created_at              = $this->mysqlDateTimeFormat();
            }

            $store->nama_pemilik                = isset($data['nama_pemilik']) ? $data['nama_pemilik'] : '';
            $store->sumber_dana                 = isset($data['sumber_dana']) ? $data['sumber_dana'] : '';
            $store->provinsi_id                 = isset($data['provinsi_id']) ? $data['provinsi_id'] : '';
            $store->kabupaten_id                = isset($data['kabupaten_id']) ? $data['kabupaten_id'] : '';
            $store->latitude                    = isset($data['latitude']) ? $data['latitude'] : '';
            $store->longitude                   = isset($data['longitude']) ? $data['longitude'] : '';
            $store->kapasitas_plts              = isset($data['kapasitas_plts']) ? $data['kapasitas_plts'] : '';
            $store->tahun_investasi             = isset($data['tahun_investasi']) ? $data['tahun_investasi'] : '';
            $store->penambahan_kapasitas        = isset($data['penambahan_kapasitas']) ? $data['penambahan_kapasitas'] : '';
            $store->penambahan_komponen         = isset($data['penambahan_komponen']) ? $data['penambahan_komponen'] : '';
            $store->peningkatan_efisiensi       = isset($data['peningkatan_efisiensi']) ? $data['peningkatan_efisiensi'] : '';
            $store->rencana_investasi           = isset($data['rencana_investasi']) ? $data['rencana_investasi'] : '';
            $store->realisasi_investasi         = isset($data['realisasi_investasi']) ? $data['realisasi_investasi'] : '';


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
    protected function investasiPltsRooftop($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $investasiPltsRooftop = $this->investasiPltsRooftop->with(['perusahaan', 'provinsi', 'kabupaten']);
        
        if(isset($params['perusahaan_id'])) {

            $investasiPltsRooftop->whereHas('perusahaan', function($q) use($params){

                $q->userId($params['perusahaan_id']);
            });
        }

        if(isset($params['id'])) {
            $investasiPltsRooftop->id($params['id']);
        }

        if(isset($params['order'])) {
            $investasiPltsRooftop->orderBy($params['order'], $orderType);
        }

        if(!$investasiPltsRooftop->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $investasiPltsRooftop->get()->toArray();
                } else {
                    return $investasiPltsRooftop->first()->toArray();
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