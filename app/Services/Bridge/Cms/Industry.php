<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\Industry as IndustryInterface;

class Industry
{
	protected $industry;

    public function __construct(IndustryInterface $industry)
    {
        $this->industry = $industry;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->industry->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->industry->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->industry->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->industry->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->industry->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->industry->delete($params);
    }
}