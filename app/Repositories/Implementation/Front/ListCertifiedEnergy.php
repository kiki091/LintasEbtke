<?php

namespace App\Repositories\Implementation\Front;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Front\ListCertifiedEnergy as ListCertifiedEnergyInterface;
use App\Models\ListCertifiedEnergy as ListCertifiedEnergyModel;
use App\Models\ListCertifiedEnergyTrans as ListCertifiedEnergyTransModel;
use App\Services\Transformation\Front\ListCertifiedEnergy as ListCertifiedEnergyTransformation;
use Cache;
use Session;
use DB;
use stdClass;
use Auth;
use DataHelper;

class ListCertifiedEnergy extends BaseImplementation implements ListCertifiedEnergyInterface
{
    protected $listCertifiedEnergy;
    protected $listCertifiedEnergyTrans;
    protected $listCertifiedEnergyTransformation;

    protected $message;
    protected $lastInsertId;


    function __construct(ListCertifiedEnergyModel $listCertifiedEnergy, ListCertifiedEnergyTransModel $listCertifiedEnergyTrans, ListCertifiedEnergyTransformation $listCertifiedEnergyTransformation)
    {
        $this->listCertifiedEnergy = $listCertifiedEnergy;
        $this->listCertifiedEnergyTrans = $listCertifiedEnergyTrans;
        $this->listCertifiedEnergyTransformation = $listCertifiedEnergyTransformation;
    }

    public function getData($data)
    {
        $params = [
            "order_by" => "order"
        ];

        $listCertifiedEnergyData = $this->listCertifiedEnergy($params, 'desc', 'array', true);
        
        return $this->listCertifiedEnergyTransformation->getListCertifiedEnergyCmsTransform($listCertifiedEnergyData);
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function listCertifiedEnergy($data = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {

        $listCertifiedEnergy = $this->listCertifiedEnergy->with(['province', 'translation', 'translations']);

        if(isset($data['is_active'])) {
            $listCertifiedEnergy->isActive($data['is_active']);
        }

        if(isset($data['id'])) {
            $listCertifiedEnergy->id($data['id']);
        }

        if(isset($params['order_by'])) {
            $listCertifiedEnergy->orderBy($params['order_by'], $orderType);
        } else {
            $listCertifiedEnergy->orderBy('order', $orderType);
        }


        if(!$listCertifiedEnergy->count())
            return array();

        if(isset($data['id'])) 
        {
            return $listCertifiedEnergy->first()->toArray();
        }
        
        return $listCertifiedEnergy->get()->toArray();
    }


}