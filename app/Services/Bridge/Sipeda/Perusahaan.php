<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Sipeda\Perusahaan as PerusahaanInterface;

class Perusahaan {

    /**
     * @var UserInterface
     */
    protected $user;

    public function __construct(PerusahaanInterface $user)
    {
        $this->user = $user;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function setSipedaAuthSession($params = array())
    {
        return $this->user->setSipedaAuthSession($params);
    }

} 