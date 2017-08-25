<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\Event as EventInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Event as EventModels;
use App\Models\EventTrans as EventTransModels;
use App\Models\EventImages as EventImagesModels;
use App\Services\Transformation\Cms\Event as EventTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class Event extends BaseImplementation implements EventInterface
{
    protected $event;
    protected $eventTrans;
    protected $eventImages;
    protected $eventTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'event__lintas__ebtke';


    function __construct(EventModels $event, EventTransModels $eventTrans, EventImagesModels $eventImages, EventTransformation $eventTransformation)
    {
    	$this->event = $event;
        $this->eventTrans = $eventTrans;
        $this->eventImages = $eventImages;
        $this->eventTransformation = $eventTransformation;
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

        $eventData = $this->event($params, 'asc', 'array', false);

        return $this->eventTransformation->getEventCmsTransform($eventData);
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

            $store = $this->event;

            if ($this->isEditMode($data)) {
                $store          = $this->event->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->thumbnail   = isset($data['thumbnail']) ? $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName() : '';
                $store->is_active   = true;
                $store->total_view  = '0';
                $store->order       = $this->event->max('order')+1;
                
                $store->created_at  = $this->mysqlDateTimeFormat();
                $store->created_by  = DataHelper::userId();
            }
            
            $store->date_start  = isset($data['date_start']) ? \Carbon\Carbon::parse($data['date_start'])->toDateTimeString() : '';
            $store->date_end    = isset($data['date_end']) ? \Carbon\Carbon::parse($data['date_end'])->toDateTimeString() : '';

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

        $finalData = $this->eventTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->eventTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($eventId)
    {
        if (empty($eventId))
            return false;

        return $this->eventTrans->where('event_id', $eventId)->delete();
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
                        "event_id"       => $this->lastInsertId,
                        "created_at"      => $this->mysqlDateTimeFormat(),
                        "updated_at"    => $this->mysqlDateTimeFormat(),
                    ];
                }

                if ($this->eventImages->insert($finalData) != true) {
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

            if (! $data['thumbnail']->move('./' . EVENT_THUMBNAIL_DIRECTORY, $filename)) {
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

                if (! $file->move('./' . EVENT_IMAGES_DIRECTORY, $filename)) {
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

        $singleEventData = $this->event($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->eventTransformation->getSingleForEditEventTransform($singleEventData));
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

            $oldData = $this->event
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->event
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

                $event           = EventModels::find($val);
                $event->order    = $orderValue;

                $event->save();
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

            $delete = $this->event
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

            $oldData = $this->eventImages->find($data['id']);

            if($this->eventImages->where('id', $data['id'])->delete()) {

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
    protected function event($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $event = $this->event->with(['translation', 'translations', 'event_images']);

        if(isset($params['limit_data'])) {
            $event->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $event->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $event->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $event->orderBy($params['order_by'], $orderType);
        }

        if(!$event->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $event->get()->toArray();
                } 
                else 
                {
                    return $event->first()->toArray();
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