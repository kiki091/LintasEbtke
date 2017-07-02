<?php

namespace App\Services\Bridge\Auth;

use App\Repositories\Contracts\Auth\System as SystemInterface;

class System {

    /**
     * @var UserInterface
     */
    protected $system;

    public function __construct(SystemInterface $system)
    {
        $this->system = $system;
    }

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = array())
    {
        return $this->system->getData($params);
    }
} 