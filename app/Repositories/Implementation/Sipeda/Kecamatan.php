<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\Kecamatan as KecamatanInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\Kecamatan as KecamatanModel;
use App\Services\Transformation\Sipeda\Kecamatan as KecamatanTransformation;
use SipedaDataHelper;
use Carbon\Carbon;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Kecamatan extends BaseImplementation implements KecamatanInterface
{

    protected $message;
    protected $lastInsertId;
    protected $kecamatan;
    protected $kecamatanTransformation;

    function __construct(KecamatanModel $kecamatan, KecamatanTransformation $kecamatanTransformation)
    {

        $this->kecamatan = $kecamatan;
        $this->kecamatanTransformation = $kecamatanTransformation;
    }

	/**
     * Get Data
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function getData($data)
    {
        $params = [
            "order_by" => 'id',
        ];

        $kecamatanData = $this->kecamatan($params, 'desc', 'array', false);

        return $this->kecamatanTransformation->getKecamatanTransform($kecamatanData);
    }

    /**
     * Get Data
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function getDataByKabupaten($data)
    {
        $params = [
            "kabupaten_id" => $data['kabupaten_id'],
            "order_by" => 'id',
        ];

        $kecamatanData = $this->kecamatan($params, 'desc', 'array', false);
        
        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->kecamatanTransformation->getKecamatanTransform($kecamatanData));
    }

    /**
     * Get All Data To Array
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function kecamatan($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $kecamatan = $this->kecamatan->with('kabupaten');

        if(isset($params['kabupaten_id'])) {
            $kecamatan->kabupatenId($params['kabupaten_id']);
        }

        if(isset($params['id'])) {
            $kecamatan->id($params['id']);
        }

        if(isset($params['order'])) {
            $kecamatan->orderBy($params['order'], $orderType);
        }

        if(!$kecamatan->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $kecamatan->get()->toArray();
                } else {
                    return $kecamatan->first()->toArray();
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