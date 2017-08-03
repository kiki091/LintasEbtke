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
     * Get Data Popula rNews
     * @param $params
     * @return mixed
     */
    public function getPopularNews($params = [])
    {
        return $this->news->getPopularNews($params);
    }

    /**
     * Get Data Detail
     * @param $params
     * @return mixed
     */
    public function getNewsDetail($slug)
    {
        return $this->news->getNewsDetail($slug);
    }

    /**
     * Get Data Category News
     * @param $params
     * @return mixed
     */
    public function getNewsCategory($params = [])
    {
        return $this->news->getNewsCategory($params);
    }

    /**
     * Get Data News By Category
     * @param $params
     * @return mixed
     */
    public function getNewsByCategory($slug)
    {
        return $this->news->getNewsByCategory($slug);
    }
}