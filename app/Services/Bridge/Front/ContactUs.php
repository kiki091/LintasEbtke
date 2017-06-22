<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\ContactUs as ContactUsInterface;

class ContactUs
{
	protected $contactUs;

    public function __construct(ContactUsInterface $contactUs)
    {
        $this->contactUs = $contactUs;
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function store($params = [])
    {
        return $this->contactUs->store($params);
    }
}