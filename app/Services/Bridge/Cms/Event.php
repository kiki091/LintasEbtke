<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\Event as EventInterface;

class Event
{
	protected $event;

    public function __construct(EventInterface $event)
    {
        $this->event = $event;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->event->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->event->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->event->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->event->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->event->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->event->delete($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function editImageSlider($params = [])
    {
        return $this->event->editImageSlider($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function deleteImageSlider($params = [])
    {
        return $this->event->deleteImageSlider($params);
    }
}