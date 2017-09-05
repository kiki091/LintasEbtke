<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\NreccEvents as NreccEventsInterface;

class NreccEvents
{
	protected $nreccEvents;

    public function __construct(NreccEventsInterface $nreccEvents)
    {
        $this->nreccEvents = $nreccEvents;
    }

    /**
     * Get Data
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->nreccEvents->getData($params);
    }

    /**
     * Get Detail
     * @param $params
     * @return mixed
     */
    public function detail($slug)
    {
        return $this->nreccEvents->detail($slug);
    }
}