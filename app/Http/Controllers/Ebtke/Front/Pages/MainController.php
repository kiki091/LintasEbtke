<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Bridge\Front\News as NewsServices;
use App\Services\Bridge\Front\Company as CompanyServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Api\Response as ResponseService;

class MainController extends FrontController
{

    protected $seo;
    protected $news;
    protected $company;
    protected $mainBanner;
    protected $response;

    const MAIN_BANNER_KEY = 'banner:landing';
    const SEO_LANDING_KEY = 'home:pages';
    const REDIS_COMPANY_HISTORY = 'history';

    public function __construct(CompanyServices $company, NewsServices $news, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->news = $news;
        $this->company = $company;
        $this->mainBanner = $mainBanner;
        $this->response = $response;

    }


    public function index(Request $request)
    {
        $data['latest_news'] = $this->news->getNewsHome();
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::MAIN_BANNER_KEY]);
        $data['history'] = $this->company->getCompanyHistory(["key" => self::REDIS_COMPANY_HISTORY]);
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_LANDING_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.main';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}