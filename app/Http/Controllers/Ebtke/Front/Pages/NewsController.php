<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\News as NewsServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class NewsController extends FrontController
{

    protected $news;
    protected $seo;
    protected $response;

    const SEO_KEY = 'landing:news';

    public function __construct(NewsServices $news, SeoServices $seo, ResponseService $response)
    {
        $this->news = $news;
        $this->seo = $seo;
        $this->response = $response;

    }


    public function landing(Request $request)
    {
        $data['latest_news'] = $this->news->getNewsHome();
        $data['popular_news'] = $this->news->getPopularNews();
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.news.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function detail($slug)
    {
        $data['detail_news'] = $this->news->getNewsDetail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.news.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}