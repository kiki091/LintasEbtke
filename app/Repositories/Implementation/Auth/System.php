<?php

namespace App\Repositories\Implementation\Auth;

use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Auth\System as SystemInterface;
use App\Models\Auth\System as SystemModel;
use App\Services\Transformation\Auth\System as SystemTransformation;
use App\Custom\Facades\DataHelper;

use Cache;
use Session;
use DB;
use Auth;
use Hash;

class System extends BaseImplementation implements SystemInterface
{

    protected $system;
    protected $systemTransformation;

    function __construct(SystemModel $system, SystemTransformation $systemTransformation)
    {

        $this->system = $system;
        $this->systemTransformation = $systemTransformation;
    }

    /**
     * Get Data System
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function getData($data)
    {
    	$params = [
    		'order'	=> 'name',
    	];

    	$systemData = $this->system($params, 'asc', 'array', false);

    	return $this->systemTransformation->getSystemCmsTransform($systemData);
    }

    /**
     * Get All Data system
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function system($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
    	$system = $this->system;

        if(isset($params['id'])) {
            $system->id($params['id']);
        }

        if(isset($params['order'])) {
            $system->orderBy($params['order'], $orderType);
        }

        if(!$system->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $system->get()->toArray();
                } else {
                    return $system->first()->toArray();
                }
            break;
        }
    }

}