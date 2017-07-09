<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;

class MainBanner
{
	/**
     * get Data 
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    public function getMainBannerCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setMainBannerCmsTransform($data);
    }

    /**
     * Get Singl Data Transformation
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */
    public function getSingleForEditMainBannerTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditMainBannerTransform($data);
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
     * @param $lastInsertId
     * @return array|void
     */

    protected function setMainBannerCmsTransform($data)
    {
    	$dataTranform = array_map(function($data)
        {
            return [
                'id'             => isset($data['id']) ? $data['id'] : '',
                'title'          => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'filename_url'     => isset($data['filename']) ? asset(MAIN_BANNER_TRANS_IMAGE_DIRECTORY.rawurlencode($data['filename'])) : '',
                'is_active'      => isset($data['is_active']) ? $data['is_active'] : '',
                
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

    protected function setSingleForEditMainBannerTransform($data)
    {
        $dataTransform = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id'] = isset($data['id']) ? $data['id'] : '';
        $dataTransform['filename_url'] = isset($data['filename']) ? asset(MAIN_BANNER_TRANS_IMAGE_DIRECTORY.rawurlencode($data['filename'])) : [];

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
                    "locale"                => $value,
                    "title"                 => isset($data['title'][$value]) ? $data['title'][$value] : '',
                    "main_banner_id"        => $lastInsertId,
                    "created_at"            => mysqlDateTimeFormat(),
                    "updated_at"            => mysqlDateTimeFormat(),
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
                $returnValue['title'][$value['locale']] = $value['title'];
            }
            return $returnValue;

        } catch(\Exception $e) {
            return array();
        }
    }

}