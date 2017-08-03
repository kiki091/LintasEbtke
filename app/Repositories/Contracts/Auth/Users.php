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

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params);

    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params);

    /**
     * @param $params
     * @return mixed
     */
    public function store($params);

    /**
     * @param $params
     * @return mixed
     */
    public function edit($params);


} 