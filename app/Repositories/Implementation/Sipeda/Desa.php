<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\Desa as DesaInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\Desa as DesaModel;
use App\Services\Transformation\Sipeda\Desa as DesaTransformation;
use SipedaDataHelper;
use Carbon\Carbon;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Desa extends BaseImplementation implements DesaInterface
{

    protected $message;
    protected $lastInsertId;
    protected $desa;
    protected $desaTransformation;

    function __construct(DesaModel $desa, DesaTransformation $desaTransformation)
    {

        $this->desa = $desa;
        $this->desaTransformation = $desaTransformation;
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

        $desaData = $this->desa($params, 'desc', 'array', false);

        return $this->desaTransformation->getDesaTransform($desaData);
    }

    /**
     * Get Data
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function getDataByKecamatan($data)
    {
        $params = [
            "kecamatan_id" => $data['kecamatan_id'],
            "order_by" => 'id',
        ];

        $desaData = $this->desa($params, 'desc', 'array', false);
        
        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->desaTransformation->getdesaTransform($desaData));
    }

    /**
     * Get All Data To Array
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function desa($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $desa = $this->desa->with('kecamatan');

        if(isset($params['kecamatan_id'])) {
            $desa->kecamatanId($params['kecamatan_id']);
        }

        if(isset($params['id'])) {
            $desa->id($params['id']);
        }

        if(isset($params['order'])) {
            $desa->orderBy($params['order'], $orderType);
        }

        if(!$desa->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $desa->get()->toArray();
                } else {
                    return $desa->first()->toArray();
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