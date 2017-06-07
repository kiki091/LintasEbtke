<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\News as NewsInterface;

class News
{
	protected $news;

    public function __construct(NewsInterface $news)
    {
        $this->news = $news;
    }

    /**
     * Get Data News Home
     * @param $params
     * @return mixed
     */
    public function getNewsHome($params = [])
    {
        return $this->news->getNewsHome($params);
    }

    /**
     * Get Data News Home
     * @param $params
     * @return mixed
     */
    public function getNewsDetail($slug)
    {
        return $this->news->getNewsDetail($slug);
    }
}