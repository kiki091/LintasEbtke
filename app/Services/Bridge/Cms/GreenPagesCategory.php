<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\GreenPagesCategory as GreenPagesCategoryInterface;

class GreenPagesCategory
{
	protected $greenPagesCategory;

    public function __construct(GreenPagesCategoryInterface $greenPagesCategory)
    {
        $this->greenPagesCategory = $greenPagesCategory;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->greenPagesCategory->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->greenPagesCategory->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->greenPagesCategory->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->greenPagesCategory->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->greenPagesCategory->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->greenPagesCategory->delete($params);
    }
}