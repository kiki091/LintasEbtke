<?php

namespace App\Services\Bridge\Sipeda;

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

    /**
     * @param $params
     * @return mixed
     */
    public function registered($params = array())
    {
        return $this->user->registered($params);
    }

} 