<?php

namespace App\Services\Transformation\Front;

class Navigation
{
	/**
     * get Data Translation
     * @param $data
     * @param $lastInsertId
     * @return array|void
     */

    // Get Transformation Top Navigation

    public function getTopNavigationTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();


        return $this->setTopNavigationTransform($data);
    }

    // Set Transformation Top Navigation

    protected function setTopNavigationTransform($data)
    {
        $dataTranform = array_map(function($data)
        {
            return [
                'top_menu'          => $this->getTopNavigationTranslation($data['top_menu_trans'])
            ];

        },$data);

        return $dataTranform;
        
    }

    // Get Transformation Top Navigation Translation

    protected function getTopNavigationTranslation($data)
    {
        $dataTranform = array_map(function($data)
        {
            return [

                'locale'        => isset($data['locale']) ? $data['locale'] : '',
                'title'         => isset($data['title']) ? strtoupper($data['title']) : '',
                'slug'          => isset($data['slug']) ? $data['slug'] : '',
            ];
        },$data);

        return $dataTranform;


    }

    // Get Transformation Navigation

	public function getNavigationTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();


        return $this->setNavigationTransform($data);
    }

    // Set Transformation Navigation

    protected function setNavigationTransform($data)
    {
        $dataTranform = array_map(function($data)
        {
            return [
                'menu'          => [
                    'class'             => isset($data['class']) ? $data['class'] : '',
                    'menu_trans'        => $this->getNavigationTranslation($data['menu_tran']),
                ],
                'sub_menu' => $this->getSubNavigationTranslation($data['sub_menu']['sub_menu_tran'])
            ];

        },$data);
        
        return $dataTranform;
        
    }

    // Get Transformation Navigation Translation

    protected function getNavigationTranslation($data)
    {
    	$dataTranform['locale']	= isset($data['locale']) ? $data['locale'] : '';
        $dataTranform['title']  = isset($data['title']) ? strtoupper($data['title']) : '';
        $dataTranform['slug']   = isset($data['slug']) ? $data['slug'] : '';

        return $dataTranform;


    }

    // Get Transformation Sub Navigation Translation

    protected function getSubNavigationTranslation($data)
    {
        
    	$dataTranform = array_map(function($data)
    	{
    		return [
    		
    			'locale'     => isset($data['locale']) ? $data['locale'] : '',
                'title'         => isset($data['title']) ? strtoupper($data['title']) : '',
                'slug'          => isset($data['slug']) ? $data['slug'] : '',
    		];
    	},$data);

        // krsort($dataTranform);
        $rows = ceil(count($dataTranform) / 5); // calculate slice to 5 items per row
        $piecesSub_nav = array_chunk($dataTranform, ceil(count($dataTranform) / $rows), true);

        return $piecesSub_nav;
    }
}