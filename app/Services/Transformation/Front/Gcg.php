<?php

namespace App\Services\Transformation\Front;

use App\Custom\PusriHelper;
 
class Gcg
{
	/**
     * Get GCG Overview Transformation
     * @param $data
     * @return array
     */
    public function getGcgForLandingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();


        return $this->setGcgForLandingTransform($data);
    }

    protected function setGcgForLandingTransform($data)
    {
    	if(!is_array($data) || empty($data))
            return array();

        if(PusriHelper::getCurrentLanguageKey() == "en")
        {

            $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
            $dataTransform['tag_id'] = isset($data['tag_id']) ? $data['tag_id'] : '';
            $dataTransform['thumbnail'] = isset($data['thumbnail']) ? $data['thumbnail'] : '';
            $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(GCG_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
            $dataTransform['is_active'] = isset($data['is_active']) ? $data['is_active'] : '';
            $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
            $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
            $dataTransform['side_description'] = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';
            $dataTransform['description'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,493) : '';
            $dataTransform['blockquote'] = isset($data['translation']['description']) ? substr($data['translation']['description'],489,415) : '';
            
        }else {
            $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
            $dataTransform['tag_id'] = isset($data['tag_id']) ? $data['tag_id'] : '';
            $dataTransform['thumbnail'] = isset($data['thumbnail']) ? $data['thumbnail'] : '';
            $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(GCG_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
            $dataTransform['is_active'] = isset($data['is_active']) ? $data['is_active'] : '';
            $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
            $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
            $dataTransform['side_description'] = isset($data['translation']['side_description']) ? $data['translation']['side_description'] : '';
            $dataTransform['description'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,314) : '';
            $dataTransform['blockquote'] = isset($data['translation']['description']) ? substr($data['translation']['description'],314,342) : '';
        }
        

        return $dataTransform;
    }
}