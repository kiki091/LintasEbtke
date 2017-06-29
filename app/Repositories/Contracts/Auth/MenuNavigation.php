<?php

namespace App\Repositories\Contracts\Auth;


interface MenuNavigation
{

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

} 