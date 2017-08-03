<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\MainBanner as MainBannerInterface;
use App\Models\MainBanner as MainBannerModel;
use App\Models\MainBannerTrans as MainBannerTransModel;
use App\Services\Transformation\Cms\MainBanner as MainBannerTransformation;
use Cache;
use Session;
use DB;
use stdClass;
use Auth;
use DataHelper;

class MainBanner extends BaseImplementation implements MainBannerInterface
{
    protected $mainBanner;
    protected $mainBannerTrans;
    protected $mainBannerTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'main_banner__lintas__ebtke';

    function __construct(MainBannerModel $mainBanner, MainBannerTransModel $mainBannerTrans, MainBannerTransformation $mainBannerTransformation)
    {
        $this->mainBanner = $mainBanner;
        $this->mainBannerTrans = $mainBannerTrans;
        $this->mainBannerTransformation = $mainBannerTransformation;
        $this->uniqueIdImagePrefix = uniqid(self::PREFIX_IMAGE_NAME);
    }

    public function getData($data)
    {
        $params = [
            "banner_key" => $data['key']
        ];

        $mainBannerData = $this->mainBanner($params, 'desc', 'array', true);
        
        return $this->mainBannerTransformation->getMainBannerCmsTransform($mainBannerData);
    }

    /**
     * Store Data
     * @param $data
     * @return bool
     */

    public function store($data, $key)
    {
        try {

            DB::beginTransaction();

            if ($this->storeData($data, $key) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }
            if ($this->storeDataTranslation($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            if ($this->uploadImage($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_upload_image_success'), true);
        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Store Data
     * @param $data
     * @return mixed
     */
    protected function storeData($data, $key)
    {
        try {

            $store                        = $this->mainBanner;

            if ($this->isEditMode($data)) {
                
                $store                    = $this->mainBanner->find($data['id']);

                if (!empty($data['filename'])) {
                    
                    $store->filename      = isset($data['filename']) ? $this->uniqueIdImagePrefix . '_' . $data['filename']->getClientOriginalName() : '';
                }

                $store->updated_at         = $this->mysqlDateTimeFormat();

            } else {

                $store->is_active            = true;
                $store->order                = $this->mainBanner->max('order')+1;
                $store->created_by           = DataHelper::userId();
                $store->created_at           = $this->mysqlDateTimeFormat();
            }
            
            $store->key                  = isset($key) ? $key : '';

            if (!empty($data['filename'])) {
                    
                $store->filename      = isset($data['filename']) ? $this->uniqueIdImagePrefix . '_' . $data['filename']->getClientOriginalName() : '';
            }

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

        $finalData = $this->mainBannerTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->mainBannerTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($mainBannerId)
    {
        if (empty($mainBannerId))
            return false;

        return $this->mainBannerTrans->where('main_banner_id', $mainBannerId)->delete();
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

        $singleData = $this->mainBanner($data, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->mainBannerTransformation->getSingleForEditMainBannerTransform($singleData));
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

            $oldData = $this->mainBanner->id($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->mainBanner->id($data['id'])->update($updatedData);

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
            $mainBannerData = $this->getSingleMainBanner($params);

            if (!$this->removeMainBannerFiles($mainBannerData['filename_url'])) {
                DB::rollback();
                return $this->setResponse($this->message, false);
            }

            if (!$this->removeMainBanner($params)) {
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
     * Get Single Data
     * @param $params
     */
    public function getSingleMainBanner($params) {

        $primaryData = $this->mainBanner($params, 'asc', 'array', true);

        return $this->mainBannerTransformation->getSingleForEditMainBannerTransform($primaryData);
    }

    /**
     * remove Main Banner Files
     * @param $data
     */
    protected function removeMainBannerFiles($data)
    {
        try {

            $filename        = isset($data['filename']) && !empty($data['filename']) ? $data['filename'] : uniqid();

            if (file_exists('./' . MAIN_BANNER_TRANS_IMAGE_DIRECTORY . $filename)) {
                unlink('./' . MAIN_BANNER_TRANS_IMAGE_DIRECTORY . $filename);
            }

            return true;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Remove Main Banner Data From Database
     * @param $data
     * @return bool
     */
    protected function removeMainBanner($data)
    {
        try {

            $delete = $this->mainBanner
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

                $mainBanner         = MainBanner::find($val);

                $mainBanner->order  = $orderValue;

                $mainBanner->save();
            }

            return true;

        } catch (Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Upload Logo Image
     * @param $data
     * @return bool
     */
    protected function uploadImage($data)
    {
        try {

            if (!$this->isEditMode($data)){

                if (!$this->detailImageUploader($data)){
                    return false;
                }
            }
            else{

                if (!empty($data['filename'])) {
                    if (!$this->detailImageUploader($data)) {
                        return false;
                    }
                }
            }

            return true;
        }
        catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Detail Image Uploader
     * @param $file
     * @return bool
     */
    protected function detailImageUploader($data)
    {
        if($data['filename']->isValid()) {

            $filename = $this->uniqueIdImagePrefix . '_' . $data['filename']->getClientOriginalName();

            if (! $data['filename']->move('./' . MAIN_BANNER_TRANS_IMAGE_DIRECTORY, $filename)) {
                $this->message = trans('message.cms_upload_image_failed');
                return false;
            }

            return true;

        } else {
            $this->message = $data['filename']->getErrorMessage();
            return false;
        }
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function mainBanner($data = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {

        $mainBanner = $this->mainBanner->with(['translation', 'translations']);

        if(isset($data['is_active'])) {
            $mainBanner->isActive($data['is_active']);
        }

        if(isset($data['banner_key'])) {
            $mainBanner->key($data['banner_key']);
        }

        if(isset($data['id'])) {
            $mainBanner->id($data['id']);
        }

        if(isset($params['order_by'])) {
            $mainBanner->orderBy($params['order_by'], $orderType);
        } else {
            $mainBanner->orderBy('order', $orderType);
        }


        if(!$mainBanner->count())
            return array();

        if(isset($data['id'])) 
        {
            return $mainBanner->first()->toArray();
        }
        
        return $mainBanner->get()->toArray();
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