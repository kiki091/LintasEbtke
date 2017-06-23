<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Event as EventInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Event as EventServices;
use App\Models\EventTrans as EventTransServices;
use App\Models\EventImages as EventImagesServices;
use App\Services\Transformation\Front\Event as EventTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Event extends BaseImplementation implements EventInterface
{
	protected $message;
    protected $event;
    protected $eventTrans;
    protected $eventTransformation;


    function __construct(EventServices $event, EventTransServices $eventTrans, EventTransformation $eventTransformation)
    {
    	$this->event = $event;
        $this->eventTrans = $eventTrans;
    	$this->eventTransformation = $eventTransformation;
    }

    public function getData($data)
    {

        $params = [
            "is_active" => true,
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $eventData = $this->event($params, 'desc', 'array', false);

        return $this->eventTransformation->getEventTransform($eventData);
        
    }

    public function getDetail($slug)
    {

        $params = [
            "slug" => $slug,
        ];

        $eventData = $this->event($params, 'desc', 'array', true);

        return $this->eventTransformation->getEventDetailTransform($eventData);
        
    }

    /**
     * Get All Data Event
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function event($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $event = $this->event
            ->with('translation')
            ->with('translations')
            ->with('event_images');

        if(isset($params['slug']) && $params['slug']) {
            $event->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $event->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $event->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $event->orderBy('order', $orderType);
        }

        if(!$event->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $event->get()->toArray();
                } 
                else 
                {
                    return $event->first()->toArray();
                }

            break;
        }
    }

}
