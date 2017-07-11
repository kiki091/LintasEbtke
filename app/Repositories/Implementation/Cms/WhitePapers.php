<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\WhitePapers as WhitePapersInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\WhitePaper as WhitePapersModels;
use App\Models\WhitePaperTrans as WhitePapersTransModels;
use App\Services\Transformation\Cms\WhitePapers as WhitePapersTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class WhitePapers extends BaseImplementation implements WhitePapersInterface
{

    protected $whitePapers;
    protected $whitePapersTrans;
    protected $whitePapersTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'white_papers__lintas__ebtke';

    function __construct(WhitePapersModels $whitePapers, WhitePapersTransModels $whitePapersTrans, WhitePapersTransformation $whitePapersTransformation)
    {

        $this->whitePapers = $whitePapers;
        $this->whitePapersTrans = $whitePapersTrans;
        $this->whitePapersTransformation = $whitePapersTransformation;
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

        $whitePapersData = $this->whitePapers($params, 'desc', 'array', false);

        return $this->whitePapersTransformation->getWhitePapersCmsTransform($whitePapersData);
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

            //TODO: THUMBNAIL UPLOAD
            if ($this->uploadThumbnail($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            //TODO: THUMBNAIL UPLOAD
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

            $store = $this->whitePapers;

            if ($this->isEditMode($data)) {
                $store          = $this->whitePapers->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail   = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }

                if (!empty($data['file'])) {
                    $store->file        = $this->uniqueIdImagePrefix . '_' .$data['file']->getClientOriginalName();
                }

                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_active   = true;
                $store->downloaded  = '0';
                $store->rating      = '0';
                $store->order       = $this->whitePapers->max('order')+1;
                $store->created_at  = $this->mysqlDateTimeFormat();
                $store->created_by  = DataHelper::userId();
            }
            
            $store->file        = isset($data['file']) ? $this->uniqueIdImagePrefix . '_' .$data['file']->getClientOriginalName() : '';
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

        $finalData = $this->whitePapersTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->whitePapersTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $newsId
     * @return bool
     */
    protected function removeDatTranslation($whitePapersId)
    {
        if (empty($whitePapersId))
            return false;

        return $this->whitePapersTrans->where('white_paper_id', $whitePapersId)->delete();
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

            if (! $data['thumbnail']->move('./' . PAPERS_IMAGES_DIRECTORY, $filename)) {
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
     * Upload file
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
     * file Uploader
     * @param $data
     * @return bool
     */
    protected function fileUploader($data)
    {
        if ($data['file']->isValid()) {

            $filename = $this->uniqueIdImagePrefix . '_' .$data['file']->getClientOriginalName();

            if (! $data['file']->move('./' . PAPERS_FILE_DIRECTORY, $filename)) {
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

        $singleNewsData = $this->whitePapers($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->whitePapersTransformation->getSingleForEditWhitePapersTransform($singleNewsData));
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

            $oldData = $this->whitePapers
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->whitePapers
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

                $whitePapers           = WhitePapersModels::find($val);
                $whitePapers->order    = $orderValue;

                $whitePapers->save();
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

            $delete = $this->whitePapers
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
    protected function whitePapers($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $whitePapers = $this->whitePapers->with(['translation', 'translations']);

        if(isset($params['limit_data'])) {
            $whitePapers->take($params['limit_data']);
        }

        if(isset($params['is_active'])) {
            $whitePapers->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $whitePapers->orderBy($params['order_by'], $orderType);
        }

        if(!$whitePapers->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $whitePapers->get()->toArray();
                } 
                else 
                {
                    return $whitePapers->first()->toArray();
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