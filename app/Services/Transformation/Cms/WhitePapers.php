<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;

class WhitePapers
{
	/**
     * @param $data
     * @return array
     */
    public function getWhitePapersCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setWhitePapersCmsTransform($data);
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
    public function getSingleForEditWhitePapersTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditWhitePapersTransform($data);
    }

    /**
     * @param $data
     * @return array
     */
    protected function setWhitePapersCmsTransform($data)
    {
        

        $dataTransform = array_map(function($data) {

            return [
                
                'id' => isset($data['id']) ? $data['id'] : '',
                'title' => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'is_active' => isset($data['is_active']) ? $data['is_active'] : false,
                'thumbnail_url' => isset($data['thumbnail']) ? asset(PAPERS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
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
                    "locale"                => $value,
                    "title"                 => isset($data['title'][$value]) ? $data['title'][$value] : '',
                    "slug"                  => isset($data['slug'][$value]) ? str_slug($data['slug'][$value]) : '',
                    "description"           => isset($data['description'][$value]) ? $data['description'][$value] : '',
                    "meta_title"            => isset($data['meta_title'][$value]) ? $data['meta_title'][$value] : '',
                    "meta_keyword"          => isset($data['meta_keyword'][$value]) ? $data['meta_keyword'][$value] : '',
                    "meta_description"      => isset($data['meta_description'][$value]) ? $data['meta_description'][$value] : '',
                    "white_paper_id"        => $lastInsertId,
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
     * Set Data For Edit
     * @param $data
     */


    protected function setSingleForEditWhitePapersTransform($data)
    {
        $dataTransform = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id'] = isset($data['id']) ? $data['id'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(PAPERS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : [];
        //$dataTransform['file_url'] = isset($data['file']) ? asset(PAPERS_FILE_DIRECTORY.rawurlencode($data['file'])) : [];
        $dataTransform['file'] = isset($data['file']) ? $data['file'] : [];

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
                $returnValue['description'][$value['locale']] = $value['description'];
                $returnValue['meta_title'][$value['locale']] = $value['meta_title'];
                $returnValue['meta_keyword'][$value['locale']] = $value['meta_keyword'];
                $returnValue['meta_description'][$value['locale']] = $value['meta_description'];
            }
            return $returnValue;

        } catch(\Exception $e) {
            return array();
        }
    }
}