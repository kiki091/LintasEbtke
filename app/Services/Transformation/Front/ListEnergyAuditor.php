<?php

namespace App\Services\Transformation\Front;

use LaravelLocalization;

class ListEnergyAuditor
{
	/**
     * get Data 
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    public function getListEnergyAuditorCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setListEnergyAuditorCmsTransform($data);
    }

    /**
     * Set Data
     * @param $data
     * @return array|void
     */

    protected function setListEnergyAuditorCmsTransform($data)
    {
    	$dataTranform = array_map(function($data)
        {
            return [
                'id'                => isset($data['id']) ? $data['id'] : '',
                'province_name'     => isset($data['province']['name']) ? $data['province']['name'] : '',
                'fullname'          => isset($data['fullname']) ? $data['fullname'] : '',
                'company_name'      => isset($data['company_name']) ? $data['company_name'] : '',
                'type_auditor'      => isset($data['type_auditor']) ? $data['type_auditor'] : '',
                'years'             => isset($data['years']) ? $data['years'] : '',
                'sector'            => isset($data['translation']['sector']) ? $data['translation']['sector'] : '',
                'sub_sector'        => isset($data['translation']['sub_sector']) ? $data['translation']['sub_sector'] : '',
                
            ];
        }, $data);

        return $dataTranform;
    }

}