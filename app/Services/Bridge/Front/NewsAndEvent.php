<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\NewsAndEvent as NewsAndEventInterface;

class NewsAndEvent
{
	protected $news;

    public function __construct(NewsAndEventInterface $news)
    {
        $this->news = $news;
    }

    /**
     * Get Data News And Event Overview For Landing Page
     * @param $params
     * @return mixed
     */
    public function getNewsForLanding()
    {
        return $this->news->getNewsForLanding();
    }
}