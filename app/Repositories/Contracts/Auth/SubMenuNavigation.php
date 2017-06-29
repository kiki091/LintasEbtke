<?php

namespace App\Repositories\Contracts\Auth;


interface SubMenuNavigation
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