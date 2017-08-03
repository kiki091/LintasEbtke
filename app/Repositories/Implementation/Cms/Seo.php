<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\Seo as SeoInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Seo as SeoModels;
use App\Models\SeoTrans as SeoTransModels;
use App\Services\Transformation\Cms\Seo as SeoTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class Seo extends BaseImplementation implements SeoInterface
{
    protected $seo;
    protected $seoTrans;
    protected $seoTransformation;

    protected $message;
    protected $lastInsertId;

    function __construct(SeoModels $seo, SeoTransModels $seoTrans, SeoTransformation $seoTransformation)
    {
    	$this->seo                 = $seo;
        $this->seoTrans            = $seoTrans;
        $this->seoTransformation   = $seoTransformation;
    }

    /**
     * Get Data
     * @param $data
     * @return array
     */

    public function getData($data)
    {
        
        $params = [

            "key" => $data['key'],
        ];

        $seoData = $this->seo($params, 'asc', 'array', false);

        return $this->seoTransformation->getSeoCmsTransform($seoData);
    }

    /**
     * Store Data
     * @param $data
     * @return array
     */

    public function store($data, $key)
    {
        try {

            DB::beginTransaction();
            
            if(!$this->storeData($data, $key) == true)
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

    protected function storeData($data, $key)
    {
        try {

            $store = $this->seo;

            if ($this->isEditMode($data)) {
                $store          = $this->seo->find($data['id']);

                $store->updated_at  = $this->mysqlDateTimeFormat();
            } else {
                $store->key         = $key;
                $store->created_at  = $this->mysqlDateTimeFormat();
                $store->created_by  = DataHelper::userId();
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

        $finalData = $this->seoTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->seoTrans->insert($finalData);
    }


    /**
     * Remove Data Translation by ID
     * @param $seoId
     * @return bool
     */
    protected function removeDatTranslation($seoId)
    {
        if (empty($seoId))
            return false;

        return $this->seoTrans->where('seo_id', $seoId)->delete();
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

        $seoData = $this->seo($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->seoTransformation->getSingleForEditSeoTransform($seoData));
    }

    
    /**
     * Get All Data 
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function seo($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $seo = $this->seo->with(['translation', 'translations']);

        if(isset($params['id'])) {
            $seo->id($params['id']);
        }

        if(isset($params['key'])) {
            $seo->isKey($params['key']);
        }

        if(!$seo->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $seo->get()->toArray();
                } 
                else 
                {
                    return $seo->first()->toArray();
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