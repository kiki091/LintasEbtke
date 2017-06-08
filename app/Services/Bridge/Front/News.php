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
    public function getPopularNews($params = [])
    {
        return $this->news->getPopularNews($params);
    }
    

    /**
     * Get Data News Home
     * @param $params
     * @return mixed
     */
    public function getEventHome($params = [])
    {
        return $this->news->getEventHome($params);
    }

    /**
     * Get Data News Home
     * @param $params
     * @return mixed
     */
    public function getPopularEvent($params = [])
    {
        return $this->news->getPopularEvent($params);
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