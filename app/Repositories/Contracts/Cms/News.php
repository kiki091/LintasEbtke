<?php

namespace App\Repositories\Contracts\Cms;


interface News
{

    /**
     * @param $params
     * @return mixed
     */
    public function getData($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function store($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function edit($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function changeStatus($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function order($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function delete($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function editImageSlider($params);

    
    /**
     * @param $params
     * @return mixed
     */
    public function deleteImageSlider($params);



}