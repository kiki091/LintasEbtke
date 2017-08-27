<?php

namespace App\Repositories\Implementation\Front;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Front\ListEnergyAuditor as ListEnergyAuditorInterface;
use App\Models\ListEnergyAuditor as ListEnergyAuditorModel;
use App\Models\ListEnergyAuditorTrans as ListEnergyAuditorTransModel;
use App\Services\Transformation\Front\ListEnergyAuditor as ListEnergyAuditorTransformation;
use Cache;
use Session;
use DB;
use stdClass;
use Auth;
use DataHelper;

class ListEnergyAuditor extends BaseImplementation implements ListEnergyAuditorInterface
{
    protected $listEnergyAuditor;
    protected $listEnergyAuditorTrans;
    protected $listEnergyAuditorTransformation;

    protected $message;
    protected $lastInsertId;


    function __construct(ListEnergyAuditorModel $listEnergyAuditor, ListEnergyAuditorTransModel $listEnergyAuditorTrans, ListEnergyAuditorTransformation $listEnergyAuditorTransformation)
    {
        $this->listEnergyAuditor = $listEnergyAuditor;
        $this->listEnergyAuditorTrans = $listEnergyAuditorTrans;
        $this->listEnergyAuditorTransformation = $listEnergyAuditorTransformation;
    }

    public function getData($data)
    {
        $params = [
            "order_by" => "order"
        ];

        $listEnergyAuditorData = $this->listEnergyAuditor($params, 'desc', 'array', true);
        
        return $this->listEnergyAuditorTransformation->getListEnergyAuditorCmsTransform($listEnergyAuditorData);
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function listEnergyAuditor($data = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {

        $listEnergyAuditor = $this->listEnergyAuditor->with(['province', 'translation', 'translations']);

        if(isset($data['is_active'])) {
            $listEnergyAuditor->isActive($data['is_active']);
        }

        if(isset($data['id'])) {
            $listEnergyAuditor->id($data['id']);
        }

        if(isset($params['order_by'])) {
            $listEnergyAuditor->orderBy($params['order_by'], $orderType);
        } else {
            $listEnergyAuditor->orderBy('order', $orderType);
        }


        if(!$listEnergyAuditor->count())
            return array();

        if(isset($data['id'])) 
        {
            return $listEnergyAuditor->first()->toArray();
        }
        
        return $listEnergyAuditor->get()->toArray();
    }

}