<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;

class Tools
{
	/**
     * @param $data
     * @return array
     */
    public function getToolsCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setToolsCmsTransform($data);
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
    public function getSingleForEditToolsTransform($data, $relatedData, $allData)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditToolsTransform($data, $relatedData, $allData);
    }

    /**
     * @param $data
     * @return array
     */
    protected function setToolsCmsTransform($data)
    {
        

        $dataTransform = array_map(function($data) {

            return [
                
                'id' => isset($data['id']) ? $data['id'] : '',
                'filename' => isset($data['filename']) ? $data['filename'] : '',
                'is_active' => isset($data['is_active']) ? $data['is_active'] : false,
                'thumbnail_url' => isset($data['thumbnail']) ? asset(TOOLS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
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
                    "description"           => isset($data['description'][$value]) ? $data['description'][$value] : '',
                    "meta_title"            => isset($data['meta_title'][$value]) ? $data['meta_title'][$value] : '',
                    "meta_keyword"          => isset($data['meta_keyword'][$value]) ? $data['meta_keyword'][$value] : '',
                    "meta_description"      => isset($data['meta_description'][$value]) ? $data['meta_description'][$value] : '',
                    "tools_id"               => $lastInsertId,
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

    protected function setSingleForEditToolsTransform($data, $relatedData, $allData)
    {
        $dataTransform = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id'] = isset($data['id']) ? $data['id'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(TOOLS_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : [];
        $dataTransform['file_upload_url'] = isset($data['file_upload']) ? asset(TOOLS_FILE_DIRECTORY.rawurlencode($data['file_upload'])) : [];

        $dataTransform['filename'] = isset($data['filename']) ? $data['filename'] : '';
        $dataTransform['slug'] = isset($data['slug']) ? $data['slug'] : '';
        $dataTransform['version'] = isset($data['version']) ? $data['version'] : '';
        $dataTransform['country'] = isset($data['country']) ? $data['country'] : '';
        $dataTransform['tools_type'] = isset($data['tools_type']) ? $data['tools_type'] : '';
        $dataTransform['platform'] = isset($data['platform']) ? $data['platform'] : '';
        $dataTransform['manufacture'] = isset($data['manufacture']) ? $data['manufacture'] : '';
        $dataTransform['file_size'] = isset($data['file_size']) ? $data['file_size'] : '';
        $dataTransform['tools_related_id'] =  $this->setYouMightAlsoLike($data, $relatedData, $allData);

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

    /**
     * Set You Might Also Like
     * @param $singleData
     * @param $relatedData
     * @param $allData
     */
    protected function setYouMightAlsoLike($singleData, $relatedData, $allData)
    {
        try {

            $relatedDataForInArray = $this->singleTransformRelatedDataJustRelatedId($relatedData);

            $returnValue = [];
            
            foreach ($allData as $key => $item) {

                if($singleData['id'] != $item['id']) {
                    $returnValue[] = [
                        "id" => $item['id'],
                        "filename" => $item['filename'],
                        "is_checked" => in_array($item['id'],$relatedDataForInArray),
                    ];
                }
            }
            usort($returnValue, function($a, $b) {
                return $a['id'] - $b['id'];
            });

            return $returnValue;

        } catch(\Exception $e) {
            return [];
        }
    }

    /**
     * @param $relatedData
     * @return array
     */
    protected function singleTransformRelatedDataJustRelatedId($relatedData)
    {
        if (!is_array($relatedData) || empty($relatedData))
            return [];

        $returnValue= [];
        foreach ($relatedData as $key => $item) {

            $returnValue[] = $item['tools_related_id'];
            $this->relatedData[$item['tools_related_id']] = $item;
        }

        return $returnValue;

    }
}