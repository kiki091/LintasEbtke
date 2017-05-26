<?php

namespace App\Services\Transformation\Front;

use App\Custom\PusriHelper;
 
class NewsAndEvent
{
	/**
     * Get News And Event Overview Transformation
     * @param $data
     * @return array
     */
    public function getNewsAndEventForLandingTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();


        return $this->setNewsAndEventForLandingTransform($data);
    }

    protected function setNewsAndEventForLandingTransform($data)
    {
    	if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            if(PusriHelper::getCurrentLanguageKey() == "en")
            {
                return [
                    'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                    'tag_id' => isset($data['tag_id']) ? $data['tag_id'] : '',
                    'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                    'thumbnail_url' => isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
                    'is_active' => isset($data['is_active']) ? $data['is_active'] : '',
                    'title' => isset($data['translation']['title']) ? substr($data['translation']['title'],0,26) : '',
                    'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                    'side_description' => isset($data['translation']['side_description']) ? substr($data['translation']['side_description'],0,125) : '',
                    
                ];
            }else {
                return [
                    'locale' => isset($data['translation']['locale']) ? $data['translation']['locale'] : '',
                    'tag_id' => isset($data['tag_id']) ? $data['tag_id'] : '',
                    'thumbnail' => isset($data['thumbnail']) ? $data['thumbnail'] : '',
                    'thumbnail_url' => isset($data['thumbnail']) ? asset(NEWS_THUMBNAIL_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
                    'is_active' => isset($data['is_active']) ? $data['is_active'] : '',
                    'title' => isset($data['translation']['title']) ? substr($data['translation']['title'],0,35) : '',
                    'slug' => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                    'side_description' => isset($data['translation']['side_description']) ? substr($data['translation']['side_description'],0,166) : '',
                    
                ];
            }
        }, $data);

        $finalData = [];
        foreach ($dataTransform as $item) {
            $finalData[$item['tag_id']][] = $item;

        }

        return $finalData;
    }
}