<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\GreenPagesCategory as GreenPagesCategoryInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\GreenPagesCategory as GreenPagesCategoryServices;
use App\Models\GreenPagesCategoryTrans as GreenPagesCategoryTransServices;
use App\Services\Transformation\Front\GreenPagesCategory as GreenPagesCategoryTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class GreenPagesCategory extends BaseImplementation implements GreenPagesCategoryInterface
{

	protected $message;
    protected $greenPagesCategory;
    protected $greenPagesCategoryTrans;
    protected $greenPagesCategoryTransformation;

    function __construct(GreenPagesCategoryServices $greenPagesCategory, GreenPagesCategoryTransServices $greenPagesCategoryTrans, GreenPagesCategoryTransformation $greenPagesCategoryTransformation)
    {
    	$this->greenPagesCategory = $greenPagesCategory;
        $this->greenPagesCategoryTrans = $greenPagesCategoryTrans;
    	$this->greenPagesCategoryTransformation = $greenPagesCategoryTransformation;
    }

    /**
     * Get Data green Pages
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getData($data)
    {

        $params = [
            "is_active" => true,
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $greenPagesData = $this->greenPagesCategory($params, 'desc', 'array', false);

        return $this->greenPagesCategoryTransformation->getGreenPagesCategoryTransform($greenPagesData);
        
    }

    /**
     * Get Detail Green Pages
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getDetail($slug)
    {

        $params = [
            "is_active" => true,
            "slug" => $slug,
        ];

        $greenPagesDetailData = $this->greenPagesCategory($params, 'desc', 'array', true);

        return $this->greenPagesCategoryTransformation->getGreenPagesDetailCategoryTransform($greenPagesDetailData);
        
    }


    /**
     * Get All Data green Pages
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function greenPagesCategory($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $greenPagesCategory = $this->greenPagesCategory
            ->with(['translation', 'translations']);

        if(isset($params['slug']) && $params['slug']) {
            $awards->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $greenPagesCategory->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $greenPagesCategory->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $greenPagesCategory->orderBy('order', $orderType);
        }

        if(!$greenPagesCategory->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $greenPagesCategory->get()->toArray();
                } 
                else 
                {
                    return $greenPagesCategory->first()->toArray();
                }

            break;
        }
    }
}