<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\News as NewsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\News as NewsModels;
use App\Models\NewsTrans as NewsTransModels;
use App\Models\NewsRelated as NewsRelatedModels;
use App\Models\NewsImages as NewsImagesModels;
use App\Services\Transformation\Cms\News as NewsTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class News extends BaseImplementation implements NewsInterface
{
    protected $news;
    protected $newsTrans;
    protected $newsRelated;
    protected $newsImages;
    protected $newsTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'latest__news__lintas__ebtke';


    function __construct(NewsModels $news, NewsTransModels $newsTrans, NewsRelatedModels $newsRelated, NewsImagesModels $newsImages, NewsTransformation $newsTransformation)
    {
    	$this->news = $news;
        $this->newsTrans = $newsTrans;
    	$this->newsRelated = $newsRelated;
        $this->newsImages = $newsImages;
        $this->newsTransformation = $newsTransformation;
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

        $newsData = $this->news($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsCmsTransform($newsData);
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

            $store = $this->news;

            if ($this->isEditMode($data)) {
                $store          = $this->news->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }
                $store->updated_at = $this->mysqlDateTimeFormat();

            }

            $store->thumbnail   = isset($data['thumbnail']) ? $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName() : '';
            $store->is_active   = true;
            $store->order       = $this->news->max('order');
            $store->tag_id      = isset($data['tag_id']) ? $data['tag_id'] : '';
            $store->created_at  = $this->mysqlDateTimeFormat();
            $store->created_by  = DataHelper::userId();

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

        $finalData = $this->newsTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->newsTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $newsId
     * @return bool
     */
    protected function removeDatTranslation($newsId)
    {
        if (empty($newsId))
            return false;

        return $this->newsTrans->where('news_id', $newsId)->delete();
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

            if(!isset($data['news_related_id']))
                return true;

            if ($this->isEditMode($data)) {
                $this->removeDataRelated($data['id']);
            }

            if (isset($data['news_related_id']) && !empty($data['news_related_id'])) {
                $finalData = [];
                
                foreach ($data['news_related_id'] as $key => $value) {

                    $finalData[] = [
                        "news_id" => $this->lastInsertId,
                        "news_related_id" => $value,
                    ];
                    
                }

                if ($this->newsRelated->insert($finalData) != true) {
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
    protected function removeDataRelated($newsId)
    {
        if (empty($newsId))
            return false;

        return $this->newsRelated->where('news_id', $newsId)->delete();
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
                        "filename" => $item->getClientOriginalName(),
                        "news_id" => $this->lastInsertId,
                        "created_at" => $this->mysqlDateTimeFormat(),
                        "updated_at" => $this->mysqlDateTimeFormat(),
                    ];
                }

                if ($this->newsImages->insert($finalData) != true) {
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
                if (!empty($data['thumbnail'])) {
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

            if (! $data['thumbnail']->move('./' . NEWS_THUMBNAIL_DIRECTORY, $filename)) {
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

                $filename = $file->getClientOriginalName();

                if (! $file->move('./' . NEWS_BANNER_DIRECTORY, $filename)) {
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

        $singleNewsData = $this->news($params, 'asc', 'array', true);
        $allNewsData = $this->news($params, 'asc', 'array', false);
        $newsRelatedData = $this->newsRelated(['news_id' => $data['id']]);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->newsTransformation->getSingleForEditNewsTransform($singleNewsData, $newsRelatedData, $allNewsData));
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

            $oldData = $this->news
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->news
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

                $news           = NewsModels::find($val);
                $news->order    = $orderValue;

                $news->save();
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
            return $this->setResponse(trans('message.cms_success_remove_data'), true);

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

            $delete = $this->news
                ->id($data['id'])
                ->forceDelete();

            if ($delete)
                return true;

            $this->message = trans('message.cms_failed_remove_data');
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
            return $this->setResponse(trans('message.cms_success_update_image_slider'), true);

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

            $oldData = $this->newsImages->find($data['id']);

            if($this->newsImages->where('id', $data['id'])->delete()) {

                DB::commit();
                return $this->setResponse(trans('message.cms_success_remove_data'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_remove_data'), false);

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
    protected function news($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $news = $this->news->with(['translation', 'translations', 'related', 'news_images']);

        if(isset($params['limit_data'])) {
            $news->take($params['limit_data']);
        }

        if(isset($params['is_active'])) {
            $news->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $news->orderBy($params['order_by'], $orderType);
        }

        if(!$news->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $news->get()->toArray();
                } 
                else 
                {
                    return $news->first()->toArray();
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
