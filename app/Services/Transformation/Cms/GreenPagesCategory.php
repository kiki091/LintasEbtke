<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;
use Carbon\Carbon;

class GreenPagesCategory
{
	/**
     * @param $data
     * @return array
     */
    public function getGreenPagesCategoryCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setGreenPagesCategoryCmsTransform($data);
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
     * Get Data Transformation For Edit
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */
    public function getGreenPagesCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setGreenPagesCategoryTransform($data);
    }

    /**
     * @param $data
     * @return array
     */
    protected function setGreenPagesCategoryCmsTransform($data)
    {
        

        $dataTransform = array_map(function($data) {

            return [
                
                'id'            => isset($data['id']) ? $data['id'] : '',
                'title'         => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : false,
            ];
        },$data);
        
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
                    "title"                     => isset($data['title'][$value]) ? $data['title'][$value] : '',
                    "slug"                      => isset($data['slug'][$value]) ? str_slug($data['slug'][$value]) : '',
                    "green_pages_category_id"   => $lastInsertId,
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
     * Set Data For Edit
     * @param $data
     */

    protected function setGreenPagesCategoryTransform($data)
    {
        $dataTransform = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id'] = isset($data['id']) ? $data['id'] : '';

        return $dataTransform;
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
                $returnValue['title'][$value['locale']] = $value['title'];
                $returnValue['slug'][$value['locale']] = $value['slug'];
            }
            return $returnValue;

        } catch(\Exception $e) {
            return array();
        }
    }

}