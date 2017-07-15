<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\ContactUs as ContactUsInterface;

class ContactUs
{
	protected $contactUs;

    public function __construct(ContactUsInterface $contactUs)
    {
        $this->contactUs = $contactUs;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->contactUs->getData($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function show($params = [])
    {
        return $this->contactUs->show($params);
    }

    /**
     * @param $params
     * @return mixed
     */
    public function delete($params = [])
    {
        return $this->contactUs->delete($params);
    }
}