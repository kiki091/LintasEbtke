<?php

namespace App\Services\Transformation\Cms;

use LaravelLocalization;
use DataHelper;
use Carbon\Carbon;

class Event
{
	/**
     * @param $data
     * @return array
     */
    public function getEventCmsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEventCmsTransform($data);
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
    public function getSingleForEditEventTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setSingleForEditEventTransform($data);
    }

    /**
     * @param $data
     * @return array
     */
    protected function setEventCmsTransform($data)
    {
        

        $dataTransform = array_map(function($data) {

            return [
                
                'id'            => isset($data['id']) ? $data['id'] : '',
                'title'         => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'is_active'     => isset($data['is_active']) ? $data['is_active'] : false,
                'date_start'    => isset($data['date_start']) ? Carbon::parse($data['date_start'])->toDayDateTimeString() : '',
                'date_end'      => isset($data['date_end']) ? Carbon::parse($data['date_end'])->toDayDateTimeString() : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(EVENT_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
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
                    "introduction"          => isset($data['introduction'][$value]) ? $data['introduction'][$value] : '',
                    "description"           => isset($data['description'][$value]) ? $data['description'][$value] : '',
                    "meta_title"            => isset($data['meta_title'][$value]) ? $data['meta_title'][$value] : '',
                    "meta_keyword"          => isset($data['meta_keyword'][$value]) ? $data['meta_keyword'][$value] : '',
                    "meta_description"      => isset($data['meta_description'][$value]) ? $data['meta_description'][$value] : '',
                    "event_id"               => $lastInsertId,
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

    protected function setSingleForEditEventTransform($data)
    {
        $dataTransform = $this->setTranslationForEditData($data['translations']);
        $dataTransform['id'] = isset($data['id']) ? $data['id'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(EVENT_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : [];
        $dataTransform['date_start'] = isset($data['date_start']) ? Carbon::parse($data['date_end'])->toDateTimeString() : '';
        $dataTransform['date_end'] = isset($data['date_end']) ? Carbon::parse($data['date_end'])->toDateTimeString() : '';
        $dataTransform['filename_url'] = isset($data['event_images']) ? $this->setImageUrlImagesForEdit($data['event_images'], 'filename') : [];
        $dataTransform['total_detail_image'] = isset($data['event_images']) ? $this->setDefaultTotalDetailImage($data['event_images']) : [];
        $dataTransform['event_images'] = isset($data['event_images']) ? $this->populateImagesForEdit($data['event_images'], 'filename') : [];

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
                $returnValue[] = asset(EVENT_IMAGES_DIRECTORY.rawurlencode($item[$index]));
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