<?php

namespace App\Services\Transformation\Front;

use App\Custom\PusriHelper;
 
class Gp3k
{
	/**
     * Get GCG Overview Transformation
     * @param $data
     * @return array
     */
    public function getGp3kForLandingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();


        return $this->setGp3kForLandingTransform($data);
    }

    protected function setGp3kForLandingTransform($data)
    {
    	if(!is_array($data) || empty($data))
            return array();

        if(PusriHelper::getCurrentLanguageKey() == "en")
        {

            $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
            $dataTransform['tag_id'] = isset($data['tag_id']) ? $data['tag_id'] : '';
            $dataTransform['thumbnail'] = isset($data['thumbnail']) ? $data['thumbnail'] : '';
            $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(GP3K_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '';

            $dataTransform['filename_url'] = isset($data['filename']) ? asset(GP3K_THUMBNAIL_DIRECTORY.rawurlencode($data['filename'])) : '';
            $dataTransform['is_active'] = isset($data['is_active']) ? $data['is_active'] : '';
            $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
            $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
            $dataTransform['description_left'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,565) : '';
            $dataTransform['description_right'] = isset($data['translation']['description']) ? substr($data['translation']['description'],565,676) : '';
            
        }else {
            $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
            $dataTransform['tag_id'] = isset($data['tag_id']) ? $data['tag_id'] : '';
            $dataTransform['thumbnail'] = isset($data['thumbnail']) ? $data['thumbnail'] : '';
            $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(GP3K_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
            $dataTransform['filename_url'] = isset($data['filename']) ? asset(GP3K_THUMBNAIL_DIRECTORY.rawurlencode($data['filename'])) : '';
            $dataTransform['is_active'] = isset($data['is_active']) ? $data['is_active'] : '';
            $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
            $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
            $dataTransform['description_left'] = isset($data['translation']['description']) ? substr($data['translation']['description'],0,532) : '';
            $dataTransform['description_right'] = isset($data['translation']['description']) ? substr($data['translation']['description'],532,616) : '';
        }
        

        return $dataTransform;
    }
}