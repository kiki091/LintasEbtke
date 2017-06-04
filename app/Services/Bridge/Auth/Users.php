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
    public function changePassword($params = array())
    {
        return $this->user->changePassword($params);
    }

} 