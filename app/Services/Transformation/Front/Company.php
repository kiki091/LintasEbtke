<?php

namespace App\Services\Transformation\Front;

class Company
{
	/**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getCompanyHistoryTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setCompanyHistoryTransform($data);
    }

    /**
     * Get Main Banner Transformation
     * @param $data
     * @return array
     */
    public function getOrganizationStructureTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setOrganizationStructureTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setOrganizationStructureTransform($data)
    {
        

        $dataTransform = array_map(function($data) {

            return [
                'fullname'          => isset($data['fullname']) ? $data['fullname'] : '',
                'thumbnail'         => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                'thumbnail_url'     => isset($data['thumbnail']) ? asset(COMPANY_COMPANY_ORGANIZATION_STRUCTURE_IMAGES_DIRECTORY.$data['thumbnail']) : '',
                'filename'          => isset($data['filename']) ? $data['filename'] : '',
                'filename_url'      => isset($data['filename']) ? asset(COMPANY_COMPANY_ORGANIZATION_STRUCTURE_IMAGES_DIRECTORY.$data['filename']) : '',
                'title_position'    => isset($data['translation']['title_position']) ? $data['translation']['title_position'] : '',
                'description'       => isset($data['translation']['description']) ? $data['translation']['description'] : '',
            ];
        },$data);
        
        return $dataTransform;
    }

    protected function setCompanyHistoryTransform($data)
    {
        $dataTransform['file_url'] = isset($data['file']) ? asset(COMPANY_HISTORY_FILE_DIRECTORY.$data['file']) : '';
        $dataTransform['downloaded'] = isset($data['downloaded']) ? $data['downloaded'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['introduction'] = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['description_left'] = isset($data['translation']['description_left']) ? $data['translation']['description_left'] : '';
        $dataTransform['description_right'] = isset($data['translation']['description_right']) ? $data['translation']['description_right'] : '';

        return $dataTransform;
    }
}