<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Auth\Users as UsersInterface;

class Users {

    /**
     * @var UserInterface
     */
    protected $user;

    public function __construct(UsersInterface $user)
    {
        $this->user = $user;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function setAuthSession($params = array())
    {
        return $this->user->setAuthSession($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function registered($params = array())
    {
        return $this->user->registered($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changePassword($params = array())
    {
        return $this->user->changePassword($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->user->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params)
    {
        return $this->user->changeStatus($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function store($params = array())
    {
        return $this->user->store($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params = array())
    {
        return $this->user->edit($params);
    }

} 