<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\CompanyHistory as CompanyHistoryInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\CompanyHistory as CompanyHistoryModels;
use App\Models\CompanyHistoryTrans as CompanyHistoryTransModels;
use App\Services\Transformation\Cms\CompanyHistory as CompanyHistoryTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class CompanyHistory extends BaseImplementation implements CompanyHistoryInterface
{
    protected $companyHistory;
    protected $companyHistoryTrans;
    protected $companyHistoryTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'company__history__lintas__ebtke';


    function __construct(CompanyHistoryModels $companyHistory, CompanyHistoryTransModels $companyHistoryTrans, CompanyHistoryTransformation $companyHistoryTransformation)
    {
    	$this->companyHistory = $companyHistory;
        $this->companyHistoryTrans = $companyHistoryTrans;
        $this->companyHistoryTransformation = $companyHistoryTransformation;
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

        $companyHistoryData = $this->companyHistory($params, 'asc', 'array', false);

        return $this->companyHistoryTransformation->getCompanyHistoryCmsTransform($companyHistoryData);
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
            if ($this->uploadFileUpload($data) != true) {
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

            $store = $this->companyHistory;

            if ($this->isEditMode($data)) {
                $store          = $this->companyHistory->find($data['id']);

                if (!empty($data['file'])) {
                    $store->file       = $this->uniqueIdImagePrefix . '_' .$data['file']->getClientOriginalName();
                }

                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->downloaded  = '0';
                $store->created_at  = $this->mysqlDateTimeFormat();
                $store->created_by  = DataHelper::userId();
            }
            
            $store->file   = isset($data['file']) ? $this->uniqueIdImagePrefix . '_' .$data['file']->getClientOriginalName() : '';

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

        $finalData = $this->companyHistoryTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->companyHistoryTrans->insert($finalData);
    }


    /**
     * Remove Data Translation by ID
     * @param $companyHistoryId
     * @return bool
     */
    protected function removeDatTranslation($companyHistoryId)
    {
        if (empty($companyHistoryId))
            return false;

        return $this->companyHistoryTrans->where('company_history_id', $companyHistoryId)->delete();
    }
    /**
     * Upload Thumbnail
     * @param $data
     * @return bool
     */
    protected function uploadFileUpload($data)
    {
        try {
            if (!$this->isEditMode($data)) {

                if ( !$this->fileUploader($data)) {
                    return false;
                }

            } else {
                //TODO: Edit Mode
                if (isset($data['file']) && !empty($data['file'])) {
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
        if ($data['file']->isValid()) {

            $filename = $this->uniqueIdImagePrefix . '_' .$data['file']->getClientOriginalName();

            if (! $data['file']->move('./' . COMPANY_HISTORY_FILE_DIRECTORY, $filename)) {
                $this->message = trans('message.cms_upload_thumbnail_failed');
                return false;
            }

            return true;

        } else {
            $this->message = $data['file']->getErrorMessage();
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

        $companyHistoryData = $this->companyHistory($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->companyHistoryTransformation->getSingleForEditCompanyHistoryTransform($companyHistoryData));
    }

    
    /**
     * Get All Data 
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function companyHistory($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $companyHistory = $this->companyHistory->with(['translation', 'translations']);

        if(isset($params['id'])) {
            $companyHistory->id($params['id']);
        }

        if(!$companyHistory->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $companyHistory->get()->toArray();
                } 
                else 
                {
                    return $companyHistory->first()->toArray();
                }

            break;
        }
    }

    /**
     * Check is edit mode or no
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }
}