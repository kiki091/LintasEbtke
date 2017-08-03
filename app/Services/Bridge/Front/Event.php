<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Event as EventInterface;

class Event
{
	protected $event;

    public function __construct(EventInterface $event)
    {
        $this->event = $event;
    }

    /**
     * Get Data event Home
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->event->getData($params);
    }

    /**
     * Get Data event Home
     * @param $params
     * @return mixed
     */
    public function getDetail($params = [])
    {
        return $this->event->getDetail($params);
    }

    /**
     * Get Data News Home
     * @param $params
     * @return mixed
     */
    public function getNewsDetail($slug)
    {
        return $this->news->getNewsDetail($slug);
    }
}