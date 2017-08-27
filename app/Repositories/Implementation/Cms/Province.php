<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\Province as ProvinceInterface;
use App\Models\Province as ProvinceModel;
use App\Services\Transformation\Cms\Province as ProvinceTransformation;
use Cache;
use Session;
use DB;
use stdClass;
use Auth;
use DataHelper;

class Province extends BaseImplementation implements ProvinceInterface
{
    protected $province;
    protected $provinceTransformation;

    protected $message;
    protected $lastInsertId;


    function __construct(ProvinceModel $province, ProvinceTransformation $provinceTransformation)
    {
        $this->province = $province;
        $this->provinceTransformation = $provinceTransformation;
    }

    /** 
     * Get data province
     * @param $data
     * @return array
     */

    public function getData($data)
    {
        $params = [
            "is_active" => true
        ];

        $provinceData = $this->province($params, 'asc', 'array', false);
        
        return $this->provinceTransformation->getProvinceCmsTransform($provinceData);
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function province($data = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {

        $province = $this->province;

        if(isset($data['is_active'])) {
            $province->isActive($data['is_active']);
        }

        if(isset($data['id'])) {
            $province->id($data['id']);
        }

        if(isset($params['order_by'])) {
            $province->orderBy($params['order_by'], $orderType);
        } else {
            $province->orderBy('id', $orderType);
        }


        if(!$province->count())
            return array();

        if(isset($data['id'])) 
        {
            return $province->first()->toArray();
        }
        
        return $province->get()->toArray();
    }


    /**
     * Check need edit Mode or No
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }

}