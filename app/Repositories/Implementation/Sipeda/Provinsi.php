<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\Provinsi as ProvinsiInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\Provinsi as ProvinsiModel;
use App\Services\Transformation\Sipeda\Provinsi as ProvinsiTransformation;
use SipedaDataHelper;
use Carbon\Carbon;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Provinsi extends BaseImplementation implements ProvinsiInterface
{

    protected $message;
    protected $lastInsertId;
    protected $provinsi;
    protected $provinsiTransformation;

    function __construct(ProvinsiModel $provinsi, ProvinsiTransformation $provinsiTransformation)
    {

        $this->provinsi = $provinsi;
        $this->provinsiTransformation = $provinsiTransformation;
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
            "order_by" => 'id',
        ];

        $provinsiData = $this->provinsi($params, 'desc', 'array', false);

        return $this->provinsiTransformation->getProvinsiTransform($provinsiData);
    }

    /**
     * Get All Data To Array
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function provinsi($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $provinsi = $this->provinsi;

        if(isset($params['id'])) {
            $provinsi->id($params['id']);
        }

        if(isset($params['order'])) {
            $provinsi->orderBy($params['order'], $orderType);
        }

        if(!$provinsi->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $provinsi->get()->toArray();
                } else {
                    return $provinsi->first()->toArray();
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