<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Gp3k as Gp3kInterface;

class Gp3k
{
	protected $gp3k;

    public function __construct(Gp3kInterface $gp3k)
    {
        $this->gp3k = $gp3k;
    }

    /**
     * Get Data GCG Overview For Landing Page
     * @param $params
     * @return mixed
     */
    public function getGp3kForLanding()
    {
        return $this->gp3k->getGp3kForLanding();
    }
}