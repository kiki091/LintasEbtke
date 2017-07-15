<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\EnergyConservation as EnergyConservationInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\EnergyConservation as EnergyConservationModel;
use App\Models\EnergyConservationTrans as EnergyConservationTransModel;
use App\Models\EnergyConservationMaps as EnergyConservationMapsModel;
use App\Services\Transformation\Front\EnergyConservation as EnergyConservationTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class EnergyConservation extends BaseImplementation implements EnergyConservationInterface
{
	protected $message;
    protected $energyConservation;
    protected $energyConservationTrans;
    protected $energyConservationMaps;
    protected $energyConservationTransformation;


    function __construct(EnergyConservationModel $energyConservation, EnergyConservationTransModel $energyConservationTrans, EnergyConservationMapsModel $energyConservationMaps, EnergyConservationTransformation $energyConservationTransformation)
    {
    	$this->energyConservation = $energyConservation;
        $this->energyConservationTrans = $energyConservationTrans;
        $this->energyConservationMaps = $energyConservationMaps;
    	$this->energyConservationTransformation = $energyConservationTransformation;
    }

    /**
     * Get Data
     * @return array
     * @param $data
     */

    public function getData($data)
    {

        $params = [
            "is_active" => true,
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $listData = $this->energyConservation($params, 'desc', 'array', false);

        return $this->energyConservationTransformation->getEnergyConservationTransform($listData);
        
    }

    /**
     * Get Maps Data
     * @return array
     * @param $data
     */

    public function showMapsData($data)
    {

        $params = [
            "energy_conservation_id" => '1',
            //"maps_category_id" => '1',
        ];

        $mapsData = $this->energyConservationMaps($params, 'desc', 'array', false);

        return $this->energyConservationTransformation->getEnergyConservationMapsTransform($mapsData);
        
    }

    /**
     * Get Detail Data
     * @return array
     * @param $data
     */

    public function detail($slug)
    {

        $params = [
            "slug" => $slug,
        ];

        $singleData = $this->energyConservation($params, 'desc', 'array', true);

        return $this->energyConservationTransformation->getEnergyConservationDetailTransform($singleData);
        
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function energyConservation($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $energyConservation = $this->energyConservation
            ->with('translation')
            ->with('translations')
            ->with('maps_data');

        if(isset($params['slug']) && $params['slug']) {
            $energyConservation->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $energyConservation->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $energyConservation->take($params['limit']);
        }

        if(isset($params['order_by'])) {
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
     * Get Maps Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function energyConservationMaps($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $energyConservationMaps = $this->energyConservationMaps
            ->with('energy_conservation','maps_category','province');

        if(isset($params['maps_category_id'])) {
            $energyConservationMaps->categoryId($params['maps_category_id']);
        }

        if(isset($params['energy_conservation_id'])) {
            $energyConservationMaps->conservationId($params['energy_conservation_id']);
        }

        if(!$energyConservationMaps->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $energyConservationMaps->get()->toArray();
                } 
                else 
                {
                    return $energyConservationMaps->first()->toArray();
                }

            break;
        }
    }

}
