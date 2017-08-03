<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Auth\MenuNavigation as MenuNavigationInterface;

class MenuNavigation {

    /**
     * @var UserInterface
     */
    protected $menuNavigation;

    public function __construct(MenuNavigationInterface $menuNavigation)
    {
        $this->menuNavigation = $menuNavigation;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->menuNavigation->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params)
    {
        return $this->menuNavigation->changeStatus($params);
    }
} 