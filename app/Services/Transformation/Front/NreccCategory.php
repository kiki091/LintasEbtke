<?php

namespace App\Services\Transformation\Front;

class NreccCategory
{
	/**
     * Get NreccCategory Transformation
     * @param $data
     * @return array
     */
    public function getNreccCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNreccCategoryTransform($data);
    }

    /**
     * Get NreccCategory With List Transformation
     * @param $data
     * @return array
     */
    public function getNreccCategoryWithListInstitutionTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setNreccCategoryWithListInstitutionTransform($data);
    }

    /**
     * Get Detail NreccCategory With List Transformation
     * @param $data
     * @return array
     */
    public function getDetailNreccCategoryWithListInstitutionTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setDetailNreccCategoryWithListInstitutionTransform($data);
    }

    /**
     * Set NreccCategory Transformation
     * @param $data
     * @return array
     */
    protected function setNreccCategoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                
                'title'             => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug'              => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set NreccCategory With List Transformation
     * @param $data
     * @return array
     */
    protected function setNreccCategoryWithListInstitutionTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                
                'title_category'             => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug_category'              => isset($data['translation']['slug']) ? route('detailEvent',$data['translation']['slug']) : '',
                'description_category'       => isset($data['translation']['description']) ? route('detailEvent',$data['translation']['description']) : '',
                'meta_title_category'        => isset($data['translation']['meta_title']) ? route('detailEvent',$data['translation']['meta_title']) : '',
                'meta_keyword_category'      => isset($data['translation']['meta_keyword']) ? route('detailEvent',$data['translation']['meta_keyword']) : '',
                'meta_description_category'  => isset($data['translation']['meta_description']) ? route('detailEvent',$data['translation']['meta_description']) : '',

                'list_data'                  => isset($data['institution']) ? $this->getDataListInstitution($data['institution']) : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set NreccCategory With List Institution Transformation
     * @param $data
     * @return array
     */
    protected function getDataListInstitution($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                'institution_title'         => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'institution_slug'          => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                'institution_introduction'  => isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '',
                'institution_thumbnail_url' => isset($data['thumbnail']) ? asset(NRECC_INSTITUTION_IMAGES_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
            ];
        }, $data);

        return $dataTransform;
    }

    /**
     * Set Detail NreccCategory With List Institution Transformation
     * @param $data
     * @return array
     */

    protected function setDetailNreccCategoryWithListInstitutionTransform($data)
    {

        $dataTransform['id']                = isset($data['id']) ? $data['id'] : '';
        $dataTransform['title']             = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['description']       = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title']        = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword']      = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description']  = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';

        $dataTransform['institution']       = isset($data['institution']) ?$this->getDataListInstitution($data['institution']) : '';
        
        return $dataTransform;
    }
}