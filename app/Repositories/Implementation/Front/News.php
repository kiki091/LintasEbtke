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

    public function getNewsHome($data)
    {

        $params = [
            "is_active" => true,
            "category"  => 'berita',
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $newsData = $this->news($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsTransform($newsData);
        
    }

    public function getPopularNews($params)
    {

        $params = [
            "is_active" => true,
            "total_view" => '1',
            "limit"     => '6',
            "category"  => 'berita'
        ];

        $newsData = $this->news($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsTransform($newsData);
        
    }

    public function getNewsDetail($slug)
    {

        $params = [
            "slug" => $slug,
        ];

        $newsData = $this->news($params, 'desc', 'array', true);
        $addViewer = $this->addViewer($params);

        return $this->newsTransformation->getNewsDetailTransform($newsData);
        
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
            ->with('category')
            ->with('related');

        if(isset($params['category']) && $params['category']) {
            $news->whereHas('category', function($q) use($params) {
                $q->slug($params['category']);
            });
        }

        if(isset($params['total_view'])) {
            $news->popular($params['total_view']);
        }

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

    /**
     * @param $data
     */
    public function addViewer($params)
    {
        try {
            $blogKey = 'news_detail_' . $params['slug'];

            if (!Session::has($blogKey)) {
                $this->news->where('slug', $params['slug'])->increment('total_view');
                Session::put($blogKey, 1);
            }
        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

}
