<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\ListCertifiedEnergy as ListCertifiedEnergyInterface;
use App\Models\ListCertifiedEnergy as ListCertifiedEnergyModel;
use App\Models\ListCertifiedEnergyTrans as ListCertifiedEnergyTransModel;
use App\Services\Transformation\Cms\ListCertifiedEnergy as ListCertifiedEnergyTransformation;
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

            $store                   = $this->listCertifiedEnergy;

            if ($this->isEditMode($data)) {
                
                $store               = $this->listCertifiedEnergy->find($data['id']);

                $store->updated_at   = $this->mysqlDateTimeFormat();

            } else {

                $store->is_active    = true;
                $store->order        = $this->listCertifiedEnergy->max('order')+1;
                $store->created_by   = DataHelper::userId();
                $store->created_at   = $this->mysqlDateTimeFormat();
            }
            
            $store->fullname         = isset($data['fullname']) ? $data['fullname'] : '';
            $store->company_name     = isset($data['company_name']) ? $data['company_name'] : '';
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

        $finalData = $this->listCertifiedEnergyTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->listCertifiedEnergyTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($listCertifiedEnergyId)
    {
        if (empty($listCertifiedEnergyId))
            return false;

        return $this->listCertifiedEnergyTrans->where('list_certified_energy_id', $listCertifiedEnergyId)->delete();
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

        $singleData = $this->listCertifiedEnergy($data, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->listCertifiedEnergyTransformation->getSingleForEditListCertifiedEnergyTransform($singleData));
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

            $oldData = $this->listCertifiedEnergy->id($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->listCertifiedEnergy->id($data['id'])->update($updatedData);

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

            if (!$this->removeListCertifiedEnergy($params)) {
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
    protected function removeListCertifiedEnergy($data)
    {
        try {

            $delete = $this->listCertifiedEnergy
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

                $listCertifiedEnergy         = ListCertifiedEnergyModel::find($val);

                $listCertifiedEnergy->order  = $orderValue;

                $listCertifiedEnergy->save();
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