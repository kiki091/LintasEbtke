<?php

namespace App\Repositories\Implementation\Auth;

use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Auth\Privilage as PrivilageInterface;
use App\Models\Auth\Privilage as PrivilageModel;
use App\Services\Transformation\Auth\Privilage as PrivilageTransformation;
use App\Custom\Facades\DataHelper;

use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Privilage extends BaseImplementation implements PrivilageInterface
{

    protected $privilage;
    protected $privilageTransformation;

    function __construct(PrivilageModel $privilage, PrivilageTransformation $privilageTransformation)
    {

        $this->privilage = $privilage;
        $this->privilageTransformation = $privilageTransformation;
    }

    /**
     * Get Data Menu Group
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function getData($data)
    {
    	$params = [
    		'order'	=> 'name',
    	];

    	$privilageData = $this->privilage($params, 'asc', 'array', false);

    	return $this->privilageTransformation->getPrivilageCmsTransform($privilageData);
    }

    /**
     * Get All Data Privilage
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function privilage($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
    	$privilage = $this->privilage->with(['role_user']);

        if(isset($params['id'])) {
            $privilage->id($params['id']);
        }

        if(isset($params['order'])) {
            $privilage->orderBy($params['order'], $orderType);
        }

        if(!$privilage->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $privilage->get()->toArray();
                } else {
                    return $privilage->first()->toArray();
                }
            break;
        }
    }

}