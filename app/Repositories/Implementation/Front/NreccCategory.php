<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\NreccCategory as NreccCategoryInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\NreccCategory as NreccCategoryServices;
use App\Models\NreccCategoryTrans as NreccCategoryTransServices;
use App\Services\Transformation\Front\NreccCategory as NreccCategoryTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class NreccCategory extends BaseImplementation implements NreccCategoryInterface
{
	protected $message;
    protected $nreccCategory;
    protected $nreccCategoryTrans;
    protected $nreccCategoryTransformation;


    function __construct(NreccCategoryServices $nreccCategory, NreccCategoryTransServices $nreccCategoryTrans, NreccCategoryTransformation $nreccCategoryTransformation)
    {
    	$this->nreccCategory = $nreccCategory;
        $this->nreccCategoryTrans = $nreccCategoryTrans;
    	$this->nreccCategoryTransformation = $nreccCategoryTransformation;
    }

    /**
     * Get Data Nrecc Institution
     * @param $data
     * @return Json array
     */
    public function getData($data)
    {

        $params = [
            "is_active" => true,
            "order_by" => 'order',
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $nreccCategoryData = $this->nreccCategory($params, 'desc', 'array', false);

        return $this->nreccCategoryTransformation->getNreccCategoryTransform($nreccCategoryData);
        
    }

    /**
     * Get Data Nrecc Institution By Category
     * @param $data
     * @return Json array
     */
    public function getDataWithListInstitution($data)
    {

        $params = [
            "is_active" => true,
            "order_by" => 'order',
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $nreccCategoryData = $this->nreccCategory($params, 'desc', 'array', false);

        return $this->nreccCategoryTransformation->getNreccCategoryWithListInstitutionTransform($nreccCategoryData);
        
    }

    /**
     * Get Detail Data Nrecc Institution By Category
     * @param $data
     * @return Json array
     */
    public function getDetailDataWithListInstitution($slug)
    {

        $params = [
            "is_active" => true,
            "order_by" => 'order',
            "slug" => isset($slug) ? $slug : '',
        ];

        $nreccCategoryData = $this->nreccCategory($params, 'desc', 'array', true);

        return $this->nreccCategoryTransformation->getDetailNreccCategoryWithListInstitutionTransform($nreccCategoryData);
        
    }

    /**
     * Get All Data Nrecc Category
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function nreccCategory($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $nreccCategory = $this->nreccCategory
            ->with('translation')
            ->with('translations')
            ->with('institution');

        if(isset($params['slug']) && $params['slug']) {
            $nreccCategory->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $nreccCategory->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $nreccCategory->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $nreccCategory->orderBy('order', $orderType);
        }

        if(!$nreccCategory->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $nreccCategory->get()->toArray();
                } 
                else 
                {
                    return $nreccCategory->first()->toArray();
                }

            break;
        }
    }

}
