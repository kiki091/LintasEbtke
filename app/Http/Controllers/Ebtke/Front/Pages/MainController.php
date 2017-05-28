<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\News as NewsServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Api\Response as ResponseService;

class MainController extends FrontController
{

    protected $news;
    protected $mainBanner;
    protected $response;

    const MAIN_BANNER_KEY = 'landing';

    public function __construct(NewsServices $news, MainBannerServices $mainBanner, ResponseService $response)
    {
        $this->news = $news;
        $this->mainBanner = $mainBanner;
        $this->response = $response;

    }


    public function index(Request $request)
    {
        $data['latest_news'] = $this->news->getNewsHome();
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::MAIN_BANNER_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.main';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}