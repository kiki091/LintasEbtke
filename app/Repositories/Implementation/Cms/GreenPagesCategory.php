<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\GreenPagesCategory as GreenPagesCategoryInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\GreenPagesCategory as GreenPagesCategoryModels;
use App\Models\GreenPagesCategoryTrans as GreenPagesCategoryTransModels;
use App\Services\Transformation\Cms\GreenPagesCategory as GreenPagesCategoryTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class GreenPagesCategory extends BaseImplementation implements GreenPagesCategoryInterface
{
    protected $greenPagesCategory;
    protected $greenPagesCategoryTrans;
    protected $greenPagesCategoryTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'event__lintas__ebtke';


    function __construct(GreenPagesCategoryModels $greenPagesCategory, GreenPagesCategoryTransModels $greenPagesCategoryTrans, GreenPagesCategoryTransformation $greenPagesCategoryTransformation)
    {
    	$this->greenPagesCategory = $greenPagesCategory;
        $this->greenPagesCategoryTrans = $greenPagesCategoryTrans;
        $this->greenPagesCategoryTransformation = $greenPagesCategoryTransformation;
        $this->uniqueIdImagePrefix = uniqid(self::PREFIX_IMAGE_NAME);
    }

    /**
     * Get Data
     * @param $data
     * @return array
     */

    public function getData($data)
    {
        
        $params = [

            "order_by" => 'order',
        ];

        $greenPagesCategoryData = $this->greenPagesCategory($params, 'asc', 'array', false);

        return $this->greenPagesCategoryTransformation->getGreenPagesCategoryCmsTransform($greenPagesCategoryData);
    }


    /**
     * Store Data
     * @param $data
     * @return array
     */

    public function store($data)
    {
        try {

            DB::beginTransaction();
            
            if(!$this->storeData($data) == true)
            {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }
            
            if(!$this->storeDatTranslation($data) == true)
            {
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
     * Store Data into Database
     * @param $data
     */

    protected function storeData($data)
    {
        try {

            $store = $this->greenPagesCategory;

            if ($this->isEditMode($data)) {
                $store              = $this->greenPagesCategory->find($data['id']);
                
                $store->updated_at  = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_active   = true;
                $store->order       = $this->greenPagesCategory->max('order')+1;
                $store->created_at  = $this->mysqlDateTimeFormat();
            }

            if($save = $store->save())
            {
                $this->lastInsertId = $store->id;
            }

            return $save;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Store Data Translation into Database
     * @param $data
     */

    protected function storeDatTranslation($data)
    {
        if ($this->isEditMode($data)) {
            $this->removeDatTranslation($data['id']);
        }

        $finalData = $this->greenPagesCategoryTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->greenPagesCategoryTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($greenPagesCategoryId)
    {
        if (empty($greenPagesCategoryId))
            return false;

        return $this->greenPagesCategoryTrans->where('green_pages_category_id', $greenPagesCategoryId)->delete();
    }

    /**
     * Get Data For Edit
     * @param $data
     */
    public function edit($data)
    {
        $params = [
            "id" => isset($data['id']) ? $data['id'] : '',
        ];

        $singleGreenPagesCategoryData = $this->greenPagesCategory($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->greenPagesCategoryTransformation->getGreenPagesCategoryTransform($singleGreenPagesCategoryData));
    }
    
    /**
     * Change Status
     * @param $params
     * @return mixed
     */
    public function changeStatus($data)
    {
        try {
            if (!isset($data['id']) && empty($data['id']))
                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $oldData = $this->greenPagesCategory
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->greenPagesCategory
                ->id($data['id'])
                ->update($updatedData);

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

                $greenPagesCategory           = GreenPagesCategoryModels::find($val);
                $greenPagesCategory->order    = $orderValue;

                $greenPagesCategory->save();
            }

            return true;

        } catch (Exception $e) {
            $this->message = $e->getMessage();
            return false;
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

            if (!$this->removeData($params)) {
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
    protected function removeData($data)
    {
        try {

            $delete = $this->greenPagesCategory
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
     * Get All Data 
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function greenPagesCategory($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $greenPagesCategory = $this->greenPagesCategory->with(['translation', 'translations']);

        if(isset($params['limit_data'])) {
            $greenPagesCategory->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $greenPagesCategory->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $greenPagesCategory->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $greenPagesCategory->orderBy($params['order_by'], $orderType);
        }

        if(!$greenPagesCategory->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $greenPagesCategory->get()->toArray();
                } 
                else 
                {
                    return $greenPagesCategory->first()->toArray();
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