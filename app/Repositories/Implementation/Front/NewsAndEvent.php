<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\NewsAndEvent as NewsAndEventInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\NewsAndEvent as NewsAndEventServices;
use App\Models\NewsAndEventTrans as NewsAndEventTransServices;
use App\Services\Transformation\Front\NewsAndEvent as NewsAndEventTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class NewsAndEvent extends BaseImplementation implements NewsAndEventInterface
{

    protected $news;
    protected $newsTrans;
    protected $newsTransformation;

    function __construct(NewsAndEventServices $news, NewsAndEventTransServices $newsTrans, NewsAndEventTransformation $newsTransformation)
    {
    	$this->news = $news;
        $this->newsTrans = $newsTrans;
    	$this->newsTransformation = $newsTransformation;
    }

    public function getNewsForLanding($params = array())
    {
    	$params = [
            "is_active" => true,
            "is_landing" => true,
            "limit_data" => 2
        ];

        $newsData = $this->news($params);

        return $this->newsTransformation->getNewsAndEventForLandingTransform($newsData);
    }

    /**
     * Get All Data Category Overview
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function news($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $news = $this->news
            ->with('tag_translation')
            ->with('translation')
            ->with('translations');

        if(isset($params['is_active'])) {
            $news->isActive($params['is_active']);
        }

        if(isset($params['slug'])) {
            $news->whereHas('translation', function($q) use ($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_landing'])) {
            $news->isLanding($params['is_landing']);
        }

        if(isset($params['limit_data'])) {
            $news->take($params['limit_data']);
        }

        if(isset($params['order_by'])) {
            $news->orderBy($params['order_by'], $orderType);
        }

        if(isset($params['id'])) {
            $news->id($params['id']);
        }

        if(!$news->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $news->get()->toArray();
                } 
                else 
                {
                    return $news->first()->toArray();
                }

            break;
        }
    }
}