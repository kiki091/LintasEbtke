<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\WhitePapers as WhitePapersInterface;

class WhitePapers
{
	protected $whitePapers;

    public function __construct(WhitePapersInterface $whitePapers)
    {
        $this->whitePapers = $whitePapers;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->whitePapers->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->whitePapers->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->whitePapers->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->whitePapers->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->whitePapers->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->whitePapers->delete($params);
    }
}