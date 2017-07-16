<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\Province as ProvinceInterface;
use App\Models\Provinsi as ProvinceModel;
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

    public function getData($data)
    {
        $params = [
            "limit" => '10'
        ];

        $provinceData = $this->province($params, 'desc', 'array', false);
        
        return $this->provinceTransformation->getProvinceCmsTransform($provinceData);
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function province($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {

        $province = $this->province->with('pulau');

        if(isset($params['id'])) {
            $province->id($params['id']);
        }

        if(isset($params['order_by'])) {
            $province->orderBy($params['order_by'], $orderType);
        } else {
            $province->orderBy('created_at', $orderType);
        }

        if(!$province->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $province->get()->toArray();
                } 
                else 
                {
                    return $province->first()->toArray();
                }

            break;
        }
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