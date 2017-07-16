<?php

namespace App\Repositories\Implementation\Cms;

use Illuminate\Http\Request;
use App\Repositories\Implementation\BaseImplementation;
use App\Repositories\Contracts\Cms\MapsCategory as MapsCategoryInterface;
use App\Models\MapsCategory as MapsCategoryModel;
use App\Services\Transformation\Cms\MapsCategory as MapsCategoryTransformation;
use Cache;
use Session;
use DB;
use stdClass;
use Auth;
use DataHelper;

class MapsCategory extends BaseImplementation implements MapsCategoryInterface
{
    protected $mapsCategory;
    protected $mapsCategoryTransformation;

    protected $message;
    protected $lastInsertId;

    function __construct(MapsCategoryModel $mapsCategory, MapsCategoryTransformation $mapsCategoryTransformation)
    {
        $this->mapsCategory = $mapsCategory;
        $this->mapsCategoryTransformation = $mapsCategoryTransformation;
    }

    public function getData($data)
    {
        $params = [
            "limit" => '10'
        ];

        $mapsCategoryData = $this->mapsCategory($params, 'desc', 'array', false);
        
        return $this->mapsCategoryTransformation->getMapsCategoryCmsTransform($mapsCategoryData);
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function mapsCategory($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {

        $mapsCategory = $this->mapsCategory->with('translations', 'translation');

        if(isset($params['id'])) {
            $mapsCategory->id($params['id']);
        }

        if(isset($params['order_by'])) {
            $mapsCategory->orderBy($params['order_by'], $orderType);
        } else {
            $mapsCategory->orderBy('created_at', $orderType);
        }

        if(!$mapsCategory->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $mapsCategory->get()->toArray();
                } 
                else 
                {
                    return $mapsCategory->first()->toArray();
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