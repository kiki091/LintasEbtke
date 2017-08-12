<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\Kabupaten as KabupatenInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\Kabupaten as KabupatenModel;
use App\Services\Transformation\Sipeda\Kabupaten as KabupatenTransformation;
use SipedaDataHelper;
use Carbon\Carbon;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Kabupaten extends BaseImplementation implements KabupatenInterface
{

    protected $message;
    protected $lastInsertId;
    protected $kabupaten;
    protected $kabupatenTransformation;

    function __construct(KabupatenModel $kabupaten, KabupatenTransformation $kabupatenTransformation)
    {

        $this->kabupaten = $kabupaten;
        $this->kabupatenTransformation = $kabupatenTransformation;
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

        $kabupatenData = $this->kabupaten($params, 'desc', 'array', false);

        return $this->kabupatenTransformation->getKabupatenTransform($kabupatenData);
    }

    /**
     * Get Data
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function getDataByProvinsi($data)
    {
        $params = [
            "provinsi_id" => $data['provinsi_id'],
            "order_by" => 'id',
        ];

        $kabupatenByProvinsiData = $this->kabupaten($params, 'asc', 'array', false);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->kabupatenTransformation->getKabupatenTransform($kabupatenByProvinsiData));
    }

    /**
     * Get All Data To Array
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function kabupaten($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $kabupaten = $this->kabupaten->with('provinsi');

        if(isset($params['provinsi_id'])) {
            $kabupaten->provinsiId($params['provinsi_id']);
        }

        if(isset($params['id'])) {
            $kabupaten->id($params['id']);
        }

        if(isset($params['order'])) {
            $kabupaten->orderBy($params['order'], $orderType);
        }

        if(!$kabupaten->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $kabupaten->get()->toArray();
                } else {
                    return $kabupaten->first()->toArray();
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