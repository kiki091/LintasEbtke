<?php

namespace App\Services\Transformation\Front;

class EnergyConservation
{
	/**
     * Get Data Transformation
     * @param $data
     * @return array
     */
    public function getEnergyConservationTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEnergyConservationTransform($data);
    }

    /**
     * Get Detail Data Transformation
     * @param $data
     * @return array
     */
    public function getEnergyConservationDetailTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEnergyConservationDetailTransform($data);
    }

    /**
     * Get Maps Data Transformation
     * @param $data
     * @return array
     */
    public function getEnergyConservationMapsTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        return $this->setEnergyConservationMapsTransform($data);
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setEnergyConservationTransform($data)
    {
        if(!is_array($data) || empty($data))
            return array();

        $dataTransform =  array_map(function($data)
        {
            return [
                
                'title'         => isset($data['translation']['title']) ? $data['translation']['title'] : '',
                'slug'         => isset($data['translation']['slug']) ? $data['translation']['slug'] : '',
                'thumbnail_url' => isset($data['thumbnail']) ? asset(ENERGY_CONSERVATION_DIRECTORY.rawurlencode($data['thumbnail'])) : '',
                'introduction'  => isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '',
                'days_ago'      =>  isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '',
            ];
        }, $data);
        
        return $dataTransform;
    }

    /**
     * Set Main Banner Transformation
     * @param $data
     * @return array
     */
    protected function setEnergyConservationDetailTransform($data)
    {
        $dataTransform['locale'] = isset($data['translation']['locale']) ? $data['translation']['locale'] : '';
        $dataTransform['title'] = isset($data['translation']['title']) ? $data['translation']['title'] : '';
        $dataTransform['thumbnail_url'] = isset($data['thumbnail']) ? asset(ENERGY_CONSERVATION_DIRECTORY.rawurlencode($data['thumbnail'])) : '';
        $dataTransform['slug'] = isset($data['translation']['slug']) ? $data['translation']['slug'] : '';
        $dataTransform['introduction'] = isset($data['translation']['introduction']) ? $data['translation']['introduction'] : '';
        $dataTransform['description'] = isset($data['translation']['description']) ? $data['translation']['description'] : '';
        $dataTransform['meta_title'] = isset($data['translation']['meta_title']) ? $data['translation']['meta_title'] : '';
        $dataTransform['meta_keyword'] = isset($data['translation']['meta_keyword']) ? $data['translation']['meta_keyword'] : '';
        $dataTransform['meta_description'] = isset($data['translation']['meta_description']) ? $data['translation']['meta_description'] : '';
        $dataTransform['created_at_home'] = isset($data['created_at']) ? date('M d, Y', strtotime($data['created_at'])) : '';
        $dataTransform['days_ago'] = isset($data['created_at']) ? \Carbon\Carbon::createFromTimeStamp(strtotime($data['created_at']))->diffForHumans() : '';

        return $dataTransform;
    }

    /**
     * Set Maps Data
     * @param $data
     * @return array
     */
    protected function setEnergyConservationMapsTransform($data)
    {

        $dataTransform = array_map(function($data) {

            return [
                'maps_category' => isset($data['maps_category']['translation']['title']) ? $data['maps_category']['translation']['title'] : '',
                'maps_category_id' => isset($data['maps_category']['id']) ? $data['maps_category']['id'] : '',
                'description'   => isset($data['energy_conservation']['translation']['description_maps']) ? $data['energy_conservation']['translation']['description_maps'] : '',
                'name'  => isset($data['province']['title']) ? $data['province']['title'] : '',
                'lat'  => isset($data['province']['latitude']) ? $data['province']['latitude'] : '',
                'lng'  => isset($data['province']['longitude']) ? $data['province']['longitude'] : '',
                'pulau'  => isset($data['province']['pulau']['title']) ? $data['province']['pulau']['title'] : '',
                
            ];
        },$data);

        // $finalData = [];

        // foreach ($dataTransform as $item) {
        //     $finalData[$item['maps_category']][] = $item;

        // }

        return json_encode($dataTransform);
    }

}