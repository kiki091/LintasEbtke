<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\GreenPages as GreenPagesInterface;

class GreenPages
{
	protected $greenPages;

    public function __construct(GreenPagesInterface $greenPages)
    {
        $this->greenPages = $greenPages;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->greenPages->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->greenPages->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = [])
    {
        return $this->greenPages->edit($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params = [])
    {
        return $this->greenPages->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function order($params = [])
    {
        return $this->greenPages->order($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->greenPages->delete($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function editImageSlider($params = [])
    {
        return $this->greenPages->editImageSlider($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function deleteImageSlider($params = [])
    {
        return $this->greenPages->deleteImageSlider($params);
    }
}