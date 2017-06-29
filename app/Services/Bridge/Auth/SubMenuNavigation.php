<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Auth\SubMenuNavigation as SubMenuNavigationInterface;

class SubMenuNavigation {

    /**
     * @var UserInterface
     */
    protected $subMenuNavigation;

    public function __construct(SubMenuNavigationInterface $subMenuNavigation)
    {
        $this->subMenuNavigation = $subMenuNavigation;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->subMenuNavigation->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params)
    {
        return $this->subMenuNavigation->changeStatus($params);
    }
} 