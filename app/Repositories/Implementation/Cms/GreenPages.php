<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\GreenPages as GreenPagesInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\GreenPages as GreenPagesModels;
use App\Models\GreenPagesTrans as GreenPagesTransModels;
use App\Models\GreenPagesImages as GreenPagesImagesModels;
use App\Services\Transformation\Cms\GreenPages as GreenPagesTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class GreenPages extends BaseImplementation implements GreenPagesInterface
{
    protected $greenPages;
    protected $greenPagesTrans;
    protected $greenPagesImages;
    protected $greenPagesTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'greenpages__lintas__ebtke';


    function __construct(GreenPagesModels $greenPages, GreenPagesTransModels $greenPagesTrans, GreenPagesImagesModels $greenPagesImages, GreenPagesTransformation $greenPagesTransformation)
    {
    	$this->greenPages = $greenPages;
        $this->greenPagesTrans = $greenPagesTrans;
        $this->greenPagesImages = $greenPagesImages;
        $this->greenPagesTransformation = $greenPagesTransformation;
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

        $greenPagesData = $this->greenPages($params, 'asc', 'array', false);

        return $this->greenPagesTransformation->getGreenPagesCmsTransform($greenPagesData);
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

            $store = $this->greenPages;

            if ($this->isEditMode($data)) {
                $store          = $this->greenPages->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->thumbnail   = isset($data['thumbnail']) ? $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName() : '';
                $store->office_name             = isset($data['office_name']) ? $data['office_name'] : '';
                $store->slug                    = isset($data['slug']) ? str_slug($data['slug']) : '';
                $store->phone_number            = isset($data['phone_number']) ? $data['phone_number'] : '';
                $store->fax_number              = isset($data['fax_number']) ? $data['fax_number'] : '';
                $store->email                   = isset($data['email']) ? $data['email'] : '';
                $store->postal_code             = isset($data['postal_code']) ? $data['postal_code'] : '';
                $store->website                 = isset($data['website']) ? $data['website'] : '';
                $store->green_pages_category_id = isset($data['green_pages_category_id']) ? $data['green_pages_category_id'] : '';
                $store->is_active               = true;
                $store->order                   = $this->greenPages->max('order')+1;
                $store->created_at              = $this->mysqlDateTimeFormat();
                $store->created_by              = DataHelper::userId();
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

        $finalData = $this->greenPagesTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->greenPagesTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $greenPagesId
     * @return bool
     */
    protected function removeDatTranslation($greenPagesId)
    {
        if (empty($greenPagesId))
            return false;

        return $this->greenPagesTrans->where('green_pges_id', $greenPagesId)->delete();
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
                        "filename"      => $this->uniqueIdImagePrefix .'_'.$item->getClientOriginalName(),
                        "green_pges_id" => $this->lastInsertId,
                        "created_at"    => $this->mysqlDateTimeFormat(),
                        "updated_at"    => $this->mysqlDateTimeFormat(),
                    ];
                }

                if ($this->greenPagesImages->insert($finalData) != true) {
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

            if (! $data['thumbnail']->move('./' . INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY, $filename)) {
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

                if (! $file->move('./' . INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY, $filename)) {
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
        ];

        $singleGreenPagesData = $this->greenPages($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->greenPagesTransformation->getSingleForEditGreenPagesTransform($singleGreenPagesData));
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

            $oldData = $this->greenPages
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->greenPages
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

                $greenPages           = GreenPagesModels::find($val);
                $greenPages->order    = $orderValue;

                $greenPages->save();
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

            $delete = $this->greenPages
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

            $oldData = $this->greenPagesImages->find($data['id']);

            if($this->greenPagesImages->where('id', $data['id'])->delete()) {

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
    protected function greenPages($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $greenPages = $this->greenPages->with(['translation', 'translations', 'category', 'images']);

        if(isset($params['limit_data'])) {
            $greenPages->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $greenPages->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $greenPages->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $greenPages->orderBy($params['order_by'], $orderType);
        }

        if(!$greenPages->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $greenPages->get()->toArray();
                } 
                else 
                {
                    return $greenPages->first()->toArray();
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