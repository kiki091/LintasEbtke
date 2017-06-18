<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\GreenPages as GreenPagesInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\GreenPages as GreenPagesServices;
use App\Models\GreenPagesTrans as GreenPagesTransServices;
use App\Services\Transformation\Front\GreenPages as GreenPagesTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class GreenPages extends BaseImplementation implements GreenPagesInterface
{

	protected $message;
    protected $greenPages;
    protected $greenPagesTrans;
    protected $greenPagesTransformation;

    function __construct(GreenPagesServices $greenPages, GreenPagesTransServices $greenPagesTrans, GreenPagesTransformation $greenPagesTransformation)
    {
    	$this->greenPages = $greenPages;
        $this->greenPagesTrans = $greenPagesTrans;
    	$this->greenPagesTransformation = $greenPagesTransformation;
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

        $greenPagesData = $this->greenPages($params, 'desc', 'array', false);

        return $this->greenPagesTransformation->getGreenPagesTransform($greenPagesData);
        
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

        $greenPagesDetailData = $this->greenPages($params, 'desc', 'array', true);

        return $this->greenPagesTransformation->getGreenPagesDetailTransform($greenPagesDetailData);
        
    }

    /**
     * Get All Data green Pages
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function greenPages($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $greenPages = $this->greenPages
            ->with(['translation', 'translations', 'images']);

        if(isset($params['slug'])) {
            $greenPages->slug($params['slug']);
        }

        if(isset($params['is_active'])) {
            $greenPages->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $greenPages->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $greenPages->orderBy('order', $orderType);
        }

        if(!$greenPages->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $greenPages->get()->toArray();
                } 
                else 
                {
                    return $greenPages->first()->toArray();
                }

            break;
        }
    }
}