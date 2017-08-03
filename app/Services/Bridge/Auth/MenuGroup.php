<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Auth\MenuGroup as MenuGroupInterface;

class MenuGroup {

    /**
     * @var UserInterface
     */
    protected $menuGroup;

    public function __construct(MenuGroupInterface $menuGroup)
    {
        $this->menuGroup = $menuGroup;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->menuGroup->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params)
    {
        return $this->menuGroup->changeStatus($params);
    }
} 