<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Auth\Privilage as PrivilageInterface;

class Privilage {

    /**
     * @var UserInterface
     */
    protected $privilage;

    public function __construct(PrivilageInterface $privilage)
    {
        $this->privilage = $privilage;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->privilage->getData($params);
    }
} 