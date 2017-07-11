<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\InvestmentServices as InvestmentServicesInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\InvestmentServices as InvestmentServicesModels;
use App\Models\InvestmentServicesTrans as InvestmentServicesTransModels;
use App\Models\InvestmentServicesRelated as InvestmentServicesRelatedModels;
use App\Models\InvestmentServicesImages as InvestmentServicesImagesModels;
use App\Services\Transformation\Cms\InvestmentServices as InvestmentServicesTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Cache;
use Auth;
use Session;
use DB;

class InvestmentServices extends BaseImplementation implements InvestmentServicesInterface
{
    protected $investmentServices;
    protected $investmentServicesTrans;
    protected $investmentServicesRelated;
    protected $investmentServicesImages;
    protected $investmentServicesTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'investment_services__lintas__ebtke';


    function __construct(InvestmentServicesModels $investmentServices, InvestmentServicesTransModels $investmentServicesTrans, InvestmentServicesRelatedModels $investmentServicesRelated, InvestmentServicesImagesModels $investmentServicesImages, InvestmentServicesTransformation $investmentServicesTransformation)
    {
    	$this->investmentServices = $investmentServices;
        $this->investmentServicesTrans = $investmentServicesTrans;
    	$this->investmentServicesRelated = $investmentServicesRelated;
        $this->investmentServicesImages = $investmentServicesImages;
        $this->investmentServicesTransformation = $investmentServicesTransformation;
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

        $investmentServicesData = $this->investmentServices($params, 'asc', 'array', false);

        return $this->investmentServicesTransformation->getInvestmentServicesCmsTransform($investmentServicesData);
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

            if (!$this->isEditMode($data)) {
                if ($this->storeDataImages($data) != true) {
                    DB::rollBack();
                    return $this->setResponse($this->message, false);
                }
            }

            //TODO: THUMBNAIL UPLOAD
            if ($this->uploadThumbnail($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            //TODO: IMAGE SLIDER UPLOAD
            if (!$this->isEditMode($data)) {
                if ($this->uploadImageDetail($data) != true) {
                    DB::rollBack();
                    return $this->setResponse($this->message, false);
                }
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

            $store = $this->investmentServices;

            if ($this->isEditMode($data)) {
                $store          = $this->investmentServices->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }

                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_active   = true;
                $store->total_view  = '0';
                $store->order       = $this->investmentServices->max('order')+1;
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

    protected function storeDataTranslation($data)
    {
        if ($this->isEditMode($data)) {
            $this->removeDatTranslation($data['id']);
        }

        $finalData = $this->investmentServicesTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->investmentServicesTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $newsId
     * @return bool
     */
    protected function removeDatTranslation($investmentServicesId)
    {
        if (empty($investmentServicesId))
            return false;

        return $this->investmentServicesTrans->where('investment_services_id', $investmentServicesId)->delete();
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

            if(!isset($data['investment_services_related_id']))
                return true;

            if ($this->isEditMode($data)) {
                $this->removeDataRelated($data['id']);
            }

            if (isset($data['investment_services_related_id']) && !empty($data['investment_services_related_id'])) {
                $finalData = [];
                
                foreach ($data['investment_services_related_id'] as $key => $value) {

                    $finalData[] = [
                        "investment_services_id" => $this->lastInsertId,
                        "investment_services_related_id" => $value,
                    ];
                    
                }

                if ($this->investmentServicesRelated->insert($finalData) != true) {
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
     * @param $newsId
     * @return bool
     */
    protected function removeDataRelated($investmentServicesId)
    {
        if (empty($investmentServicesId))
            return false;

        return $this->investmentServicesRelated->where('investment_services_id', $investmentServicesId)->delete();
    }

    /**
     * Store Data Images
     * @param $data
     * @return mixed
     */
    protected function storeDataImages($data)
    {
        try {

            if (isset($data['filename']) && !empty($data['filename'])) {
                $finalData = [];
                foreach ($data['filename'] as $key => $item) {

                    $finalData[] = [
                        "filename"               => $this->uniqueIdImagePrefix .'_'.$item->getClientOriginalName(),
                        "investment_services_id" => $this->lastInsertId,
                        "created_at"             => $this->mysqlDateTimeFormat(),
                        "updated_at"             => $this->mysqlDateTimeFormat(),
                    ];
                }

                if ($this->investmentServicesImages->insert($finalData) != true) {
                    $this->message = trans('message.cms_failed_store_image_general');
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

            if (! $data['thumbnail']->move('./' . INVESTMENT_SERVICES_DIRECTORY, $filename)) {
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
     * Image Detail Uploader
     * @param $data
     */
    protected function uploadImageDetail($data)
    {
        try {

            if (isset($data['filename']) && !empty($data['filename'])) {

                foreach ($data['filename'] as $key => $item) {

                    if (!$this->detailImageUploader($item))
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
     * Detail Image Uploader
     * @param $file
     * @return bool
     */
    protected function detailImageUploader($file)
    {
        if(!empty($file)) {
            if ($file->isValid()) {

                $filename = $this->uniqueIdImagePrefix . '_' .$file->getClientOriginalName();

                if (! $file->move('./' . INVESTMENT_SERVICES_DIRECTORY, $filename)) {
                    $this->message = trans('message.cms_offer_upload_image_detail_failed');
                    return false;
                }

                return true;

            } else {
                $this->message = $file->getErrorMessage();
                return false;
            }
        }

        return true;
    }

    /**
     * Get Data For Edit
     * @param $data
     */
    public function edit($data)
    {
        $params = [
            "id" => isset($data['id']) ? $data['id'] : '',
            "news_id"   => isset($data['id']) ? $data['id'] : ''
        ];

        $singleInvestmentServicesData = $this->investmentServices($params, 'asc', 'array', true);
        $allInvestmentServicesData = $this->getInvestmentServicesData([]);
        $investmentServicesRelatedData = $this->investmentServicesRelated($params);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->investmentServicesTransformation->getSingleForEditInvestmentServicesTransform($singleInvestmentServicesData, $investmentServicesRelatedData, $allInvestmentServicesData));
    }

    /**
     * Get News Data
     * @param $params
     */
    public function getInvestmentServicesData()
    {
        $params = [
            "is_active" => true
        ];

        $primaryData = $this->investmentServices($params);

        return $this->investmentServicesTransformation->getInvestmentServicesCmsTransform($primaryData);
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

            $oldData = $this->investmentServices
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->investmentServices
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

                $investmentServices           = InvestmentServicesModels::find($val);
                $investmentServices->order    = $orderValue;

                $investmentServices->save();
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

            $delete = $this->investmentServices
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
     * Edit Image Slider
     * @param $data
     */
    public function editImageSlider($data)
    {
        try {

            DB::beginTransaction();

            $this->lastInsertId = $data['id'];

            if ($this->storeDataImages($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            if ($this->uploadImageDetail($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_update_image_slider_success'), true);

        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Delete Image Slider
     * @param $data
     */
    public function deleteImageSlider($data)
    {
        try {
            if (!isset($data['id']) && empty($data['id']))
                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $oldData = $this->investmentServicesImages->find($data['id']);

            if($this->investmentServicesImages->where('id', $data['id'])->delete()) {

                DB::commit();
                return $this->setResponse(trans('message.cms_success_delete_data_general'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_delete_data_general'), false);

        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Get All Data 
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function investmentServices($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $investmentServices = $this->investmentServices->with(['translation', 'translations', 'related', 'images']);

        if(isset($params['limit_data'])) {
            $investmentServices->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $investmentServices->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $investmentServices->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $investmentServices->orderBy($params['order_by'], $orderType);
        }

        if(!$investmentServices->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $investmentServices->get()->toArray();
                } 
                else 
                {
                    return $investmentServices->first()->toArray();
                }

            break;
        }
    }

    /**
     * Get All Data News Related
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    

    protected function investmentServicesRelated($params = [], $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $investmentServicesRelated = $this->investmentServicesRelated
            ->with(['related_investment_services']);

        if(isset($params['investment_services_id'])) {
            $investmentServicesRelated->investmentId($params['investment_services_id']);
        }

        if(!$investmentServicesRelated->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $investmentServicesRelated->get()->toArray();
                } else {
                    return $investmentServicesRelated->first()->toArray();
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
