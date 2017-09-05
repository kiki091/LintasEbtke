<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\NreccResources as NreccResourcesInterface;

class NreccResources
{
	protected $nreccResources;

    public function __construct(NreccResourcesInterface $nreccResources)
    {
        $this->nreccResources = $nreccResources;
    }

    /**
     * Get Data
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->nreccResources->getData($params);
    }

    /**
     * Get Detail
     * @param $params
     * @return mixed
     */
    public function detail($slug)
    {
        return $this->nreccResources->detail($slug);
    }
}