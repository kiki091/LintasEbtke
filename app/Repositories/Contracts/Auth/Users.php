<?php

namespace App\Repositories\Contracts\Auth;


interface Users
{

    /**
     * @param $params
     * @return mixed
     */
    public function setAuthSession($params);
    
    /**
     * @param $params
     * @return mixed
     */
    public function registered($params);

    /**
     * @param $params
     * @return mixed
     */
    public function changePassword($params);


} 