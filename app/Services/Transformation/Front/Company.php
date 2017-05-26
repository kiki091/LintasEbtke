<?php

namespace App\Services\Transformation\Front;

use App\Custom\PusriHelper;
 
class Company
{
	/**
     * Get Company Overview Transformation
     * @param $data
     * @return array
     */
    public function getCompanyForLandingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $company['desktop'] = $this->setCompanyForLandingDesktopTransform($data);
        $company['mobile'] = $this->setCompanyForLandingMobileTransform($data);

        return $company;
    }

    /**
     * Get Company Detail Overview Transformation
     * @param $data
     * @return array
     */

    public function getCompanyForDetailTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setCompanyForDetailTransform($data);
    }

    protected function setCompanyForLandingDesktopTransform($data)
    {
    	$dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
    	$dataTransform['side_description'] = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';

        if(PusriHelper::getCurrentLanguageKey() == "id")
        {
    	   $dataTransform['description_left'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,681) : '';
    	   $dataTransform['description_right'] = isset($data['translation']['description']) ? substr($data['translation']['description'],681,620) : '';
        }else {
            $dataTransform['description_left'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,713) : '';
            $dataTransform['description_right'] = isset($data['translation']['description']) ? substr($data['translation']['description'],713,620) : '';
        }
    	return $dataTransform;
    }

    protected function setCompanyForLandingMobileTransform($data)
    {
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['side_description'] = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';

        if(PusriHelper::getCurrentLanguageKey() == "id")
        {
           $dataTransform['description'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,260) : '';
        }else {
            $dataTransform['description'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,281) : '';
        }
        return $dataTransform;
    }

    protected function setCompanyForLandingTransform($data)
    {
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['side_description'] = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';

        if(PusriHelper::getCurrentLanguageKey() == "id")
        {
           $dataTransform['description_left'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,681) : '';
           $dataTransform['description_right'] = isset($data['translation']['description']) ? substr($data['translation']['description'],681,620) : '';
        }else {
            $dataTransform['description_left'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,713) : '';
            $dataTransform['description_right'] = isset($data['translation']['description']) ? substr($data['translation']['description'],713,620) : '';
        }
        return $dataTransform;
    }

    /**
     * Get Detal Company Overview
     */

    protected function setCompanyForDetailTransform($data)
    {
        $dataTransform['category'] = isset($data['category']['translation']['title']) ? $data['category']['translation']['title'] : '';
        $dataTransform['category_slug'] = isset($data['category']['translation']['slug']) ? $data['category']['translation']['slug'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['side_description'] = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';
        $dataTransform['highlight_description'] = isset($data['translation']['highlight_description']) ? $data['translation']['highlight_description'] : '';
        $dataTransform['description'] = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title'] = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword'] = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description'] = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';

        return $dataTransform;
    }
}