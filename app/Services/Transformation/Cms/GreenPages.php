<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;
use Carbon\Carbon;

class GreenPages
{
	/**
     * @param $data
     * @return array
     */
    public function getGreenPagesCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setGreenPagesCmsTransform($data);
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
    public function getSingleForEditGreenPagesTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditGreenPagesTransform($data);
    }

    /**
     * @param $data
     * @return array
     */
    protected function setGreenPagesCmsTransform($data)
    {
    

        $dataTransform = array_map(function($data) {

            return [
                
                'id'            => isset($data['id']) ? $data['id'] : '',
                'office_name'   => isset($data['office_name']) ? $data['office_name'] : '',
                'email'         => isset($data['email']) ? $data['email'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : false,
                'thumbnail_url' => isset($data['thumbnail']) ? asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
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
                    "address"                 => isset($data['address'][$value]) ? $data['address'][$value] : '',
                    "introduction"          => isset($data['introduction'][$value]) ? $data['introduction'][$value] : '',
                    "description"           => isset($data['description'][$value]) ? $data['description'][$value] : '',
                    "meta_title"            => isset($data['meta_title'][$value]) ? $data['meta_title'][$value] : '',
                    "meta_keyword"          => isset($data['meta_keyword'][$value]) ? $data['meta_keyword'][$value] : '',
                    "meta_description"      => isset($data['meta_description'][$value]) ? $data['meta_description'][$value] : '',
                    "green_pges_id"         => $lastInsertId,
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

    protected function setSingleForEditGreenPagesTransform($data)
    {
        $dataTransform = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id'] = isset($data['id']) ? $data['id'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : [];
        $dataTransform['office_name'] = isset($data['office_name']) ? $data['office_name'] : '';
        $dataTransform['slug'] = isset($data['slug']) ? $data['slug'] : '';
        $dataTransform['phone_number'] = isset($data['phone_number']) ? $data['phone_number'] : '';
        $dataTransform['fax_number'] = isset($data['fax_number']) ? $data['fax_number'] : '';
        $dataTransform['email'] = isset($data['email']) ? $data['email'] : '';
        $dataTransform['postal_code'] = isset($data['postal_code']) ? $data['postal_code'] : '';
        $dataTransform['website'] = isset($data['website']) ? $data['website'] : '';
        $dataTransform['green_pages_category_id'] = isset($data['green_pages_category_id']) ? $data['green_pages_category_id'] : '';
        $dataTransform['filename_url'] = isset($data['images']) ? $this->setImageUrlImagesForEdit($data['images'], 'filename') : [];
        $dataTransform['total_detail_image'] = isset($data['images']) ? $this->setDefaultTotalDetailImage($data['images']) : [];
        $dataTransform['green_pages_images'] = isset($data['images']) ? $this->populateImagesForEdit($data['images'], 'filename') : [];

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
                $returnValue['address'][$value['locale']] = $value['address'];
                $returnValue['introduction'][$value['locale']] = $value['introduction'];
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
     * Set Images URL For Edit Data
     * @param $data
     * @param $index
     * @return array
     */
    protected function setImageUrlImagesForEdit($data, $index)
    {
        try {

            $returnValue = [];
            foreach ($data as $key => $item) {
                $returnValue[] = asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.rawurlencode($item[$index]));
            }

            return $returnValue;

        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Set Default Total Detail Image For Edit Data
     * @param $data
     * @param $index
     * @return array
     */
    protected function setDefaultTotalDetailImage($data)
    {
        try {

            $returnValue = [];
            $totalImages = count($data);

            for($i=0; $i<$totalImages; $i++) {
                $returnValue[] = $i;
            }

            return $returnValue;

        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Populate Images URL For Edit Data
     * @param $data
     * @param $index
     * @return array
     */
    protected function populateImagesForEdit($data)
    {
        try {

            return array_map(function($data)
            {
                return [
                    'id' => isset($data['id']) ? $data['id'] : '',
                    'filename' => isset($data['filename']) ? $data['filename'] : '',
                ];
            }, $data);

        } catch (\Exception $e) {
            return [];
        }
    }
}