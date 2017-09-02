<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\NreccInstitution as NreccInstitutionInterface;

class NreccInstitution
{
	protected $nreccInstitution;

    public function __construct(NreccInstitutionInterface $nreccInstitution)
    {
        $this->nreccInstitution = $nreccInstitution;
    }

    /**
     * Get Data
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->nreccInstitution->getData($params);
    }

    /**
     * Get Detail
     * @param $params
     * @return mixed
     */
    public function detail($slug)
    {
        return $this->nreccInstitution->detail($slug);
    }
}