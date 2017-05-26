<?php

namespace App\Repositories\Contracts\Front;


interface Navigation
{

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getTopNavigation();

    /**
     * Get Data Navigation
     * @param $params
     * @return mixed
     */
    public function getNavigation();


}