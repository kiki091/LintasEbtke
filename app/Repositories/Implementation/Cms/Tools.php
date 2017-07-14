<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\Tools as ToolsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Tools as ToolsModels;
use App\Models\ToolsTrans as ToolsTransModels;
use App\Models\ToolsRelated as ToolsRelatedModels;
use App\Services\Transformation\Cms\Tools as ToolsTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Cache;
use Auth;
use Session;
use DB;

class Tools extends BaseImplementation implements ToolsInterface
{
    protected $tools;
    protected $toolsTrans;
    protected $toolsRelated;
    protected $toolsTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';
    protected $uniqueIdFilePrefix = '';

    const PREFIX_IMAGE_NAME = 'tools_images__lintas__ebtke';
    const PREFIX_FILE_NAME = 'tools_app__lintas__ebtke';


    function __construct(ToolsModels $tools, ToolsTransModels $toolsTrans, ToolsRelatedModels $toolsRelated, ToolsTransformation $toolsTransformation)
    {
    	$this->tools = $tools;
        $this->toolsTrans = $toolsTrans;
    	$this->toolsRelated = $toolsRelated;
        $this->toolsTransformation = $toolsTransformation;
        $this->uniqueIdImagePrefix = uniqid(self::PREFIX_IMAGE_NAME);
        $this->uniqueIdFilePrefix = uniqid(self::PREFIX_FILE_NAME);
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

        $toolsData = $this->tools($params, 'asc', 'array', false);

        return $this->toolsTransformation->getToolsCmsTransform($toolsData);
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
            
            if(!$this->storeDataTranslation($data) == true)
            {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }
            
            if(!$this->storeDataRelated($data) == true)
            {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }
            //TODO: THUMBNAIL UPLOAD
            if ($this->uploadThumbnail($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            //TODO: FILE UPLOAD
            if ($this->uploadFile($data) != true) {
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

            $store = $this->tools;

            if ($this->isEditMode($data)) {
                $store          = $this->tools->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }

                if (!empty($data['file_upload'])) {
                    $store->file_upload       = $this->uniqueIdFilePrefix . '_' .$data['file_upload']->getClientOriginalName();
                }

                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_active   = true;
                $store->order       = $this->tools->max('order')+1;
                $store->created_at  = $this->mysqlDateTimeFormat();
                $store->created_by  = DataHelper::userId();
            }
            
            $store->filename        = isset($data['filename']) ? $data['filename'] : '';
            $store->slug            = isset($data['slug']) ? $data['slug'] : '';
            $store->version         = isset($data['version']) ? $data['version'] : '';
            $store->country         = isset($data['country']) ? $data['country'] : '';
            $store->tools_type      = isset($data['tools_type']) ? $data['tools_type'] : '';
            $store->platform        = isset($data['platform']) ? $data['platform'] : '';
            $store->manufacture     = isset($data['manufacture']) ? $data['manufacture'] : '';
            $store->file_size       = isset($data['file_size']) ? $data['file_size'] : '';
            $store->thumbnail       = isset($data['thumbnail']) ? $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName() : '';
            $store->file_upload     = isset($data['file_upload']) ? $this->uniqueIdImagePrefix . '_' .$data['file_upload']->getClientOriginalName() : '';

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

    protected function storeDataTranslation($data)
    {
        if ($this->isEditMode($data)) {
            $this->removeDatTranslation($data['id']);
        }

        $finalData = $this->toolsTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->toolsTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $toolsId
     * @return bool
     */
    protected function removeDatTranslation($toolsId)
    {
        if (empty($toolsId))
            return false;

        return $this->toolsTrans->where('tools_id', $toolsId)->delete();
    }

    /**
     * Storing Data Related to database
     * @param $data
     * @param $key
     * @return bool
     */
    protected function storeDataRelated($data)
    {
        try {

            if(!isset($data['tools_related_id']))
                return true;

            if ($this->isEditMode($data)) {
                $this->removeDataRelated($data['id']);
            }

            if (isset($data['tools_related_id']) && !empty($data['tools_related_id'])) {
                $finalData = [];
                
                foreach ($data['tools_related_id'] as $key => $value) {

                    $finalData[] = [
                        "tools_id" => $this->lastInsertId,
                        "tools_related_id" => $value,
                    ];
                    
                }

                if ($this->toolsRelated->insert($finalData) != true) {
                    $this->message = trans('message.cms_failed_store_related_general');
                    return false;
                }
            }

            return true;


        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }


    /**
     * Remove Data Related by eat anad drink ID
     * @param $toolsId
     * @return bool
     */
    protected function removeDataRelated($toolsId)
    {
        if (empty($toolsId))
            return false;

        return $this->toolsRelated->where('tools_id', $toolsId)->delete();
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
     * Upload Thumbnail
     * @param $data
     * @return bool
     */
    protected function uploadFile($data)
    {
        try {
            if (!$this->isEditMode($data)) {

                if ( !$this->fileUploader($data)) {
                    return false;
                }

            } else {
                //TODO: Edit Mode
                if (isset($data['file_upload']) && !empty($data['file_upload'])) {
                    if (!$this->fileUploader($data)) {
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
    protected function fileUploader($data)
    {
        if ($data['file_upload']->isValid()) {

            $filename = $this->uniqueIdImagePrefix . '_' .$data['file_upload']->getClientOriginalName();

            if (! $data['file_upload']->move('./' . TOOLS_FILE_DIRECTORY, $filename)) {
                $this->message = trans('message.cms_upload_thumbnail_failed');
                return false;
            }

            return true;

        } else {
            $this->message = $data['file_upload']->getErrorMessage();
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

            if (! $data['thumbnail']->move('./' . TOOLS_IMAGES_DIRECTORY, $filename)) {
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
            "tools_id"   => isset($data['id']) ? $data['id'] : ''
        ];

        $singleToolsData = $this->tools($params, 'asc', 'array', true);
        $allToolsData = $this->getToolsData([]);
        $toolsRelatedData = $this->toolsRelated($params);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->toolsTransformation->getSingleForEditToolsTransform($singleToolsData, $toolsRelatedData, $allToolsData));
    }

    /**
     * Get tools Data
     * @param $params
     */
    public function getToolsData()
    {
        $params = [
            "is_active" => true
        ];

        $primaryData = $this->tools($params);

        return $this->toolsTransformation->getToolsCmsTransform($primaryData);
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

            $oldData = $this->tools
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->tools
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

                $tools           = ToolsModels::find($val);
                $tools->order    = $orderValue;

                $tools->save();
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

            $delete = $this->tools
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
    protected function tools($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $tools = $this->tools->with(['translation', 'translations', 'related']);

        if(isset($params['limit_data'])) {
            $tools->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $tools->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $tools->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $tools->orderBy($params['order_by'], $orderType);
        }

        if(!$tools->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $tools->get()->toArray();
                } 
                else 
                {
                    return $tools->first()->toArray();
                }

            break;
        }
    }

    /**
     * Get All Data tools Related
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    

    protected function toolsRelated($params = [], $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $toolsRelated = $this->toolsRelated
            ->with(['related_tools']);

        if(isset($params['tools_id'])) {
            $toolsRelated->toolsId($params['tools_id']);
        }

        if(!$toolsRelated->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $toolsRelated->get()->toArray();
                } else {
                    return $toolsRelated->first()->toArray();
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
