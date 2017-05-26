<?php

namespace App\Repositories\Contracts\Front;


interface Company
{

    /**
     * Get Data Landing Page Company Overview
     * @param $params
     * @return mixed
     */
    public function getDataForLanding();

    /**
     * Get Detail Page Company Overview
     * @param $params
     * @return mixed
     */
    public function getDetail($slug);
}