<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\Gcg as GCGInterface;

class Gcg
{
	protected $gcg;

    public function __construct(GCGInterface $gcg)
    {
        $this->gcg = $gcg;
    }

    /**
     * Get Data GCG Overview For Landing Page
     * @param $params
     * @return mixed
     */
    public function getGCGForLanding()
    {
        return $this->gcg->getGCGForLanding();
    }
}