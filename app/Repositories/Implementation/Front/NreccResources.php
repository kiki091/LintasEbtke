<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\NreccResources as NreccResourcesInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\NreccResources as NreccResourcesServices;
use App\Models\NreccResourcesTrans as NreccResourcesTransServices;
use App\Services\Transformation\Front\NreccResources as NreccResourcesTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class NreccResources extends BaseImplementation implements NreccResourcesInterface
{
	protected $message;
    protected $nreccResources;
    protected $nreccResourcesTrans;
    protected $nreccResourcesTransformation;


    function __construct(NreccResourcesServices $nreccResources, NreccResourcesTransServices $nreccResourcesTrans, NreccResourcesTransformation $nreccResourcesTransformation)
    {
    	$this->nreccResources = $nreccResources;
        $this->nreccResourcesTrans = $nreccResourcesTrans;
    	$this->nreccResourcesTransformation = $nreccResourcesTransformation;
    }

    /**
     * Get Data Nrecc Resources
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

        $nreccResourcesData = $this->nreccResources($params, 'desc', 'array', false);

        return $this->nreccResourcesTransformation->getNreccResourcesTransform($nreccResourcesData);
        
    }

    /**
     * Get Detail Nrecc Resources
     * @param $data
     * @return Json array
     */
    public function detail($slug)
    {

        $params = [
            "is_active" => true,
            "slug" => $slug,
        ];

        $nreccResourcesData = $this->nreccResources($params, 'desc', 'array', true);
        $addViewer = $this->addViewer($params);

        return $this->nreccResourcesTransformation->getNreccResourcesDetailTransform($nreccResourcesData);
        
    }

    /**
     * Get All Data Nrecc Resources
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function nreccResources($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $nreccResources = $this->nreccResources
            ->with('translation')
            ->with('translations')
            ->with('category');

        if(isset($params['slug']) && $params['slug']) {
            $nreccResources->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $nreccResources->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $nreccResources->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $nreccResources->orderBy('order', $orderType);
        }

        if(!$nreccResources->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $nreccResources->get()->toArray();
                } 
                else 
                {
                    return $nreccResources->first()->toArray();
                }

            break;
        }
    }

    /**
     * Add Viewers
     * @param $data
     */
    public function addViewer($params)
    {
        try {
            
            $this->nreccResources->whereHas('translation', function($q) use($params) {
                $q->where('slug', $params['slug']);
            })->increment('total_view');
            
        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

}
