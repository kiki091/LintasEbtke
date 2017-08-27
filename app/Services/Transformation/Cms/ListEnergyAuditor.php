<?php

namespace App\Services\Transformation\Cms;

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
     * Get Singl Data Transformation
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */
    public function getSingleForEditListEnergyAuditorTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditListEnergyAuditorTransform($data);
    }

    /**
     * Get Data Transformation For Insert Translation
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    public function getDataTranslation($data, $lastInsertId, $isEditMode)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setDataTranslation($data, $lastInsertId, $isEditMode);
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
                'is_active'         => isset($data['is_active']) ? $data['is_active'] : '',
                
            ];
        }, $data);

        return $dataTranform;
    }

    /**
     * Set Single Data
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    protected function setSingleForEditListEnergyAuditorTransform($data)
    {
        $dataTransform                  = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id']            = isset($data['id']) ? $data['id'] : '';
        $dataTransform['fullname']      = isset($data['fullname']) ? $data['fullname'] : '';
        $dataTransform['company_name']  = isset($data['company_name']) ? $data['company_name'] : '';
        $dataTransform['province_id']   = isset($data['province_id']) ? $data['province_id'] : '';
        $dataTransform['type_auditor']  = isset($data['type_auditor']) ? $data['type_auditor'] : '';
        $dataTransform['years']         = isset($data['years']) ? $data['years'] : '';

        return $dataTransform;
    }

    /**
     * Set Data Transformation For Insert Translation
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */
    protected function setDataTranslation($data, $lastInsertId, $isEditMode)
    {
        try {
            $supportedLanguage = LaravelLocalization::getSupportedLanguagesKeys();

            $finalData = [];
            foreach ($supportedLanguage as $key => $value) {
                $finalData[] = [
                    "locale"                    => $value,
                    "sector"                    => isset($data['sector'][$value]) ? $data['sector'][$value] : '',
                    "sub_sector"                => isset($data['sub_sector'][$value]) ? $data['sub_sector'][$value] : '',
                    "list_energy_auditor_id"    => $lastInsertId,
                    "created_at"                => mysqlDateTimeFormat(),
                    "updated_at"                => mysqlDateTimeFormat(),
                ];
            }

            return $finalData;
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Set Translation for edit Data
     * @param $data
     */
    protected function setTranslationForEditData($data)
    {
        try {

            if(!is_array($data) || empty($data))
                return array();

            $returnValue = [];
            foreach ($data as $value) {
                $returnValue['sector'][$value['locale']]     = $value['sector'];
                $returnValue['sub_sector'][$value['locale']] = $value['sub_sector'];
            }
            return $returnValue;

        } catch(\Exception $e) {
            return array();
        }
    }

}