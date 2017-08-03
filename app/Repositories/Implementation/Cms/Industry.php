<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\Industry as IndustryInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Industri as IndustryModels;
use App\Models\IndustriTrans as IndustryTransModels;
use App\Services\Transformation\Cms\Industry as IndustryTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class Industry extends BaseImplementation implements IndustryInterface
{
    protected $industry;
    protected $industryTrans;
    protected $industryTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'industry__lintas__ebtke';


    function __construct(IndustryModels $industry, IndustryTransModels $industryTrans, IndustryTransformation $industryTransformation)
    {
    	$this->industry = $industry;
        $this->industryTrans = $industryTrans;
        $this->industryTransformation = $industryTransformation;
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

        $industryData = $this->industry($params, 'asc', 'array', false);

        return $this->industryTransformation->getIndustryCmsTransform($industryData);
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

            //TODO: THUMBNAIL UPLOAD
            if ($this->uploadThumbnail($data) != true) {
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

            $store = $this->industry;

            if ($this->isEditMode($data)) {
                $store          = $this->industry->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_active   = true;
                $store->order       = $this->industry->max('order')+1;
                $store->created_at  = $this->mysqlDateTimeFormat();
                $store->created_by  = DataHelper::userId();
            }
            
            $store->thumbnail   = isset($data['thumbnail']) ? $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName() : '';

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

        $finalData = $this->industryTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->industryTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($industryId)
    {
        if (empty($industryId))
            return false;

        return $this->industryTrans->where('industri_id', $industryId)->delete();
    }


    /**
     * Upload Thumbnail
     * @param $data
     * @return bool
     */
    protected function uploadThumbnail($data)
    {
        try {
            if (!$this->isEditMode($data)) {

                if ( !$this->thumbnailUploader($data)) {
                    return false;
                }

            } else {
                //TODO: Edit Mode
                if (isset($data['thumbnail']) && !empty($data['thumbnail'])) {
                    if (!$this->thumbnailUploader($data)) {
                        return false;
                    }
                }
            }

            return true;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }

    }

    /**
     * Thumbnail Uploader
     * @param $data
     * @return bool
     */
    protected function thumbnailUploader($data)
    {
        if ($data['thumbnail']->isValid()) {

            $filename = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();

            if (! $data['thumbnail']->move('./' . INDUSTRI_PAGES_DIRECTORY, $filename)) {
                $this->message = trans('message.cms_upload_thumbnail_failed');
                return false;
            }

            return true;

        } else {
            $this->message = $data['thumbnail']->getErrorMessage();
            return false;
        }
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

        $singleData = $this->industry($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->industryTransformation->getSingleForEditIndustryTransform($singleData));
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

            $oldData = $this->industry
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->industry
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

                $industry           = IndustryModels::find($val);
                $industry->order    = $orderValue;

                $industry->save();
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

            $delete = $this->industry
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
    protected function industry($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $industry = $this->industry->with(['translation', 'translations']);

        if(isset($params['limit_data'])) {
            $industry->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $industry->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $industry->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $industry->orderBy($params['order_by'], $orderType);
        }

        if(!$industry->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $industry->get()->toArray();
                } 
                else 
                {
                    return $industry->first()->toArray();
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