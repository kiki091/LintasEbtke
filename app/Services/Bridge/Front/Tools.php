<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Tools as ToolsInterface;

class Tools
{
	protected $tools;

    public function __construct(ToolsInterface $tools)
    {
        $this->tools = $tools;
    }


    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->tools->getData($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getDataTopRated($params)
    {
        return $this->tools->getDataTopRated($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getDataDownloaded($params)
    {
        return $this->tools->getDataDownloaded($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getDetail($slug)
    {
        return $this->tools->getDetail($slug);
    }
}