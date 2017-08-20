<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\ListEnergyAuditor as ListEnergyAuditorInterface;
use App\Models\ListEnergyAuditor as ListEnergyAuditorModel;
use App\Models\ListEnergyAuditorTrans as ListEnergyAuditorTransModel;
use App\Services\Transformation\Cms\ListEnergyAuditor as ListEnergyAuditorTransformation;
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
     * Store Data
     * @param $data
     * @return bool
     */

    public function store($data)
    {
        try {

            DB::beginTransaction();

            if ($this->storeData($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            if ($this->storeDataTranslation($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_success_store_data_general'), true);
        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Store Data
     * @param $data
     * @return mixed
     */
    protected function storeData($data)
    {
        try {

            $store                   = $this->listEnergyAuditor;

            if ($this->isEditMode($data)) {
                
                $store               = $this->listEnergyAuditor->find($data['id']);

                $store->updated_at   = $this->mysqlDateTimeFormat();

            } else {

                $store->is_active    = true;
                $store->order        = $this->listEnergyAuditor->max('order')+1;
                $store->created_by   = DataHelper::userId();
                $store->created_at   = $this->mysqlDateTimeFormat();
            }
            
            $store->fullname         = isset($data['fullname']) ? $data['fullname'] : '';
            $store->company_name     = isset($data['company_name']) ? $data['company_name'] : '';
            $store->type_auditor     = isset($data['type_auditor']) ? $data['type_auditor'] : '';
            $store->years            = isset($data['years']) ? $data['years'] : '';
            $store->province_id      = isset($data['province_id']) ? $data['province_id'] : '';

            if($save = $store->save()) {
                $this->lastInsertId = $store->id;
            }

            return $save;

        }
        catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }


    /**
     * Store Data Translation into Database
     * @param $data
     */

    protected function storeDataTranslation($data)
    {
        if ($this->isEditMode($data)) {
            $this->removeDatTranslation($data['id']);
        }

        $finalData = $this->listEnergyAuditorTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->listEnergyAuditorTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($listEnergyAuditorId)
    {
        if (empty($listEnergyAuditorId))
            return false;

        return $this->listEnergyAuditorTrans->where('list_energy_auditor_id', $listEnergyAuditorId)->delete();
    }

    /**
     * Edit Data
     * @param $eventId
     * @return bool
     */

    public function edit($params)
    {
        $data = [
            'id' => $params
        ];

        $singleData = $this->listEnergyAuditor($data, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->listEnergyAuditorTransformation->getSingleForEditListEnergyAuditorTransform($singleData));
    }

    /**
     * Change Status Data
     * @param $eventId
     * @return bool
     */

    public function changeStatus($data)
    {
        try {

            if (!isset($data['id']) && empty($data['id']))

                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $oldData = $this->listEnergyAuditor->id($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->listEnergyAuditor->id($data['id'])->update($updatedData);

            if($changeStatus) {
                DB::commit();
                return $this->setResponse(trans('message.cms_success_update_status_general'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_update_status_general'), false);
        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Delete Data
     * @param $params
     * @return mixed
     */
    public function delete($data)
    {
        try {
            if (!isset($data['id']) && empty($data['id']))
                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $params = [
                "id" => $data['id']
            ];

            if (!$this->removeListEnergyAuditor($params)) {
                DB::rollback();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_success_delete_data_general'), true);

        } catch (\Exception $e) {
            DB::rollback();
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Remove Data From Database
     * @param $data
     * @return bool
     */
    protected function removeListEnergyAuditor($data)
    {
        try {

            $delete = $this->listEnergyAuditor
                ->id($data['id'])
                ->forceDelete();

            if ($delete)
                return true;

            $this->message = trans('message.cms_failed_delete_data_general');
            return false;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Order Data
     * @param $data
     */
    public function order($data)
    {
        try {
            DB::beginTransaction();

            if ($this->orderData($data)) {
                DB::commit();
                return $this->setResponse(trans('message.cms_success_ordering'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_ordering'), false);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Order List Data
     * @param $data
     */
    protected function orderData($data)
    {
        try {
            $i = 1 ;
            foreach ($data as $key => $val) {
                $orderValue = $i++;

                $listEnergyAuditor         = ListEnergyAuditorModel::find($val);

                $listEnergyAuditor->order  = $orderValue;

                $listEnergyAuditor->save();
            }

            return true;

        } catch (Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
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