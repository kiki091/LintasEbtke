<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\NreccEvents as NreccEventsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\NreccEvents as NreccEventsServices;
use App\Models\NreccEventsTrans as NreccEventsTransServices;
use App\Services\Transformation\Front\NreccEvents as NreccEventsTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class NreccEvents extends BaseImplementation implements NreccEventsInterface
{
	protected $message;
    protected $nreccEvents;
    protected $nreccEventsTrans;
    protected $nreccEventsTransformation;


    function __construct(NreccEventsServices $nreccEvents, NreccEventsTransServices $nreccEventsTrans, NreccEventsTransformation $nreccEventsTransformation)
    {
    	$this->nreccEvents = $nreccEvents;
        $this->nreccEventsTrans = $nreccEventsTrans;
    	$this->nreccEventsTransformation = $nreccEventsTransformation;
    }

    /**
     * Get Data Nrecc Events
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

        $nreccEventsData = $this->nreccEvents($params, 'desc', 'array', false);

        return $this->nreccEventsTransformation->getNreccEventsTransform($nreccEventsData);
        
    }

    /**
     * Get Detail Nrecc Events
     * @param $data
     * @return Json array
     */
    public function detail($slug)
    {

        $params = [
            "slug" => $slug,
        ];

        $nreccEventsData = $this->nreccEvents($params, 'desc', 'array', true);
        $addViewer = $this->addViewer($params);

        return $this->nreccEventsTransformation->getNreccEventsDetailTransform($nreccEventsData);
        
    }

    /**
     * Get All Data Nrecc Events
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function nreccEvents($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $nreccEvents = $this->nreccEvents
            ->with('translation')
            ->with('translations')
            ->with('category')
            ->with('images');

        if(isset($params['slug']) && $params['slug']) {
            $nreccEvents->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $nreccEvents->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $nreccEvents->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $nreccEvents->orderBy('order', $orderType);
        }

        if(!$nreccEvents->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $nreccEvents->get()->toArray();
                } 
                else 
                {
                    return $nreccEvents->first()->toArray();
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
            
            $this->nreccEvents->whereHas('translation', function($q) use($params) {
                $q->where('slug', $params['slug']);
            })->increment('total_view');
            
        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

}
