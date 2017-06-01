<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\News as NewsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\News as NewsServices;
use App\Models\NewsTrans as NewsTransServices;
use App\Models\NewsRelated as NewsRelatedServices;
use App\Services\Transformation\Front\News as NewsTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class News extends BaseImplementation implements NewsInterface
{
	protected $message;
    protected $news;
    protected $newsTrans;
    protected $newsTransformation;


    function __construct(NewsServices $news, NewsTransServices $newsTrans, NewsTransformation $newsTransformation)
    {
    	$this->news = $news;
        $this->newsTrans = $newsTrans;
    	$this->newsTransformation = $newsTransformation;
    }

    public function getNewsHome($params)
    {

        $params = [
            "is_active" => true,
            "limit" => 2,
        ];

        $newsData = $this->news($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsTransform($newsData);
        
    }

    /**
     * Get All Data News
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function news($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $news = $this->news
            ->with('translation')
            ->with('translations')
            ->with('related');

        if(isset($params['slug'])) {
            $news->slug($params['slug']);
        }

        if(isset($params['is_active'])) {
            $news->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $news->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $news->orderBy('order', $orderType);
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
