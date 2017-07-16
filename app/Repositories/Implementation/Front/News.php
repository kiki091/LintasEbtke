<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\News as NewsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Tag as TagServices;
use App\Models\TagTrans as TagTransServices;
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
    protected $tag;
    protected $tagTrans;
    protected $newsTransformation;


    function __construct(TagServices $tag, TagTransServices $tagTrans, NewsServices $news, NewsTransServices $newsTrans, NewsTransformation $newsTransformation)
    {
    	$this->news = $news;
        $this->newsTrans = $newsTrans;
        $this->tag = $tag;
        $this->tagTrans = $tagTrans;
    	$this->newsTransformation = $newsTransformation;
    }

    /** 
     * Get News For Landing Pages
     * @param array
     * @return array
     *
     */

    public function getNewsHome($data)
    {

        $params = [
            "is_active" => true,
            "limit_data" => '10',
            "order" => 'order'
        ];

        $newsData = $this->news($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsTransform($newsData);
        
    }

    /** 
     * Get News Popular
     * @param array
     * @return array
     *
     */

    public function getPopularNews($params)
    {

        $params = [
            "is_active" => true,
            "total_view" => '1',
            "limit"     => '6',
        ];

        $newsData = $this->news($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsTransform($newsData);
        
    }


    /** 
     * Get News For Detail Pages
     * @param array
     * @return array
     *
     */

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
     * Get News Category
     * @param array
     * @return array
     *
     */

    public function getNewsCategory($data)
    {
        $params = [
            'is_active' => true,
            'order' => 'order'
        ];

        $categoryData = $this->tag($params, 'desc', 'array', false);

        return $this->newsTransformation->getNewsCategoryTransform($categoryData);
    }

    /** 
     * Get News Category
     * @param array
     * @return array
     *
     */

    public function getNewsByCategory($slug)
    {
        $params = [
            'slug' => $slug
        ];

        $categoryData = $this->tag($params, 'desc', 'array', true);

        return $this->newsTransformation->getNewsByCategory($categoryData);
    }

    /**
     * Get All Tag News
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function tag($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $tag = $this->tag
            ->with('translation')
            ->with('translations')
            ->with('news');

        if(isset($params['slug']) && $params['slug']) {
            $tag->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $tag->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $tag->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $tag->orderBy('order', $orderType);
        }

        if(!$tag->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $tag->get()->toArray();
                } 
                else 
                {
                    return $tag->first()->toArray();
                }

            break;
        }
    }

    /**
     * Get All Data News
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function news($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $news = $this->news
            ->with('translation')
            ->with('translations')
            ->with('tags')
            ->with('news_images')
            ->with('related');

        if(isset($params['slug']) && $params['slug']) {
            $news->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['total_view'])) {
            $news->popular($params['total_view']);
        }

        if(isset($params['is_active'])) {
            $news->isActive($params['is_active']);
        }

        if(isset($params['limit_data'])) {
            $news->take($params['limit_data'],0);
        }

        if(isset($params['order_by'])) {
            $news->orderBy($params['order_by'], $orderType);
        } else {
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
