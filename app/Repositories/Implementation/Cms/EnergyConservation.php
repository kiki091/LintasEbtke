<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\EnergyConservation as EnergyConservationInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\EnergyConservation as EnergyConservationModels;
use App\Models\EnergyConservationTrans as EnergyConservationTransModels;
use App\Models\EnergyConservationMaps as EnergyConservationMapsModels;
use App\Services\Transformation\Cms\EnergyConservation as EnergyConservationTransformation;
use App\Custom\DataHelper;
use LaravelLocalization;
use Carbon\Carbon;
use Cache;
use Auth;
use Session;
use DB;

class EnergyConservation extends BaseImplementation implements EnergyConservationInterface
{
    protected $energyConservation;
    protected $energyConservationMaps;
    protected $energyConservationTrans;
    protected $energyConservationTransformation;

    protected $message;
    protected $lastInsertId;
    protected $uniqueIdImagePrefix = '';

    const PREFIX_IMAGE_NAME = 'energy_conservation__lintas__ebtke';


    function __construct(EnergyConservationModels $energyConservation, EnergyConservationTransModels $energyConservationTrans, EnergyConservationMapsModels $energyConservationMaps, EnergyConservationTransformation $energyConservationTransformation)
    {
    	$this->energyConservation = $energyConservation;
        $this->energyConservationMaps = $energyConservationMaps;
        $this->energyConservationTrans = $energyConservationTrans;
        $this->energyConservationTransformation = $energyConservationTransformation;
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

        $energyConservationData = $this->energyConservation($params, 'desc', 'array', false);

        return $this->energyConservationTransformation->getEnergyConservationCmsTransform($energyConservationData);
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
            
            if(!$this->storeMapsData($data) == true)
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

            $store = $this->energyConservation;

            if ($this->isEditMode($data)) {
                $store          = $this->energyConservation->find($data['id']);

                if (!empty($data['thumbnail'])) {
                    $store->thumbnail       = $this->uniqueIdImagePrefix . '_' .$data['thumbnail']->getClientOriginalName();
                }
                
                $store->updated_at = $this->mysqlDateTimeFormat();

            } else {
            
                $store->is_active   = true;
                $store->order       = $this->energyConservation->max('order')+1;
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

        $finalData = $this->energyConservationTransformation->getDataTranslation($data, $this->lastInsertId, $this->isEditMode($data));

        return $this->energyConservationTrans->insert($finalData);
    }

    /**
     * Remove Data Translation by ID
     * @param $eventId
     * @return bool
     */
    protected function removeDatTranslation($energyConservationId)
    {
        if (empty($energyConservationId))
            return false;

        return $this->energyConservationTrans->where('energy_conservation_id', $energyConservationId)->delete();
    }

    /**
     * Store Maps Data
     * @param $eventId
     * @return bool
     */

    protected function storeMapsData($data)
    {
        if ($this->isEditMode($data)) {
            $this->removeMapsData($data['id']);
        }

        $finalData = $this->energyConservationTransformation->getMapsDataTranslation($data['maps_data'], $this->lastInsertId, $this->isEditMode($data));

        return $this->energyConservationMaps->insert($finalData);
    }

    /**
     * Remove Maps Data by ID
     * @param $eventId
     * @return bool
     */
    protected function removeMapsData($energyConservationId)
    {
        if (empty($energyConservationId))
            return false;

        return $this->energyConservationMaps->where('energy_conservation_id', $energyConservationId)->delete();
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

            if (! $data['thumbnail']->move('./' . ENERGY_CONSERVATION_DIRECTORY, $filename)) {
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

        $singleData = $this->energyConservation($params, 'asc', 'array', true);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $this->energyConservationTransformation->getSingleForEditEnergyConservationTransform($singleData));
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

            $oldData = $this->energyConservation
                ->id($data['id'])
                ->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
            ];

            $changeStatus = $this->energyConservation
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

                $energyConservation           = EnergyConservationModels::find($val);
                $energyConservation->order    = $orderValue;

                $energyConservation->save();
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

            $delete = $this->energyConservation
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
    protected function energyConservation($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $energyConservation = $this->energyConservation->with(['translation', 'translations', 'maps_data']);

        if(isset($params['limit_data'])) {
            $energyConservation->take($params['limit_data']);
        }

        if(isset($params['id'])) {
            $energyConservation->id($params['id']);
        }

        if(isset($params['is_active'])) {
            $energyConservation->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $energyConservation->orderBy($params['order_by'], $orderType);
        } else {
            $energyConservation->orderBy('order', $orderType);
        }

        if(!$energyConservation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $energyConservation->get()->toArray();
                } 
                else 
                {
                    return $energyConservation->first()->toArray();
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