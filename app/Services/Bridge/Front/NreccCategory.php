<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\NreccCategory as NreccCategoryInterface;

class NreccCategory
{
	protected $nreccCategory;

    public function __construct(NreccCategoryInterface $nreccCategory)
    {
        $this->nreccCategory = $nreccCategory;
    }

    /**
     * Get Data
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->nreccCategory->getData($params);
    }

    /**
     * Get List Data Institution
     * @param $params
     * @return mixed
     */
    public function getDataWithListInstitution($params = [])
    {
        return $this->nreccCategory->getDataWithListInstitution($params);
    }

    /**
     * Get List Data Institution
     * @param $params
     * @return mixed
     */
    public function getDetailDataWithListInstitution($slug)
    {
        return $this->nreccCategory->getDetailDataWithListInstitution($slug);
    }
}