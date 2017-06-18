<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\GreenPages as GreenPagesServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class GreenPagesController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    protected $greenPages;


    const SEO_GREEN_PAGES_LANDING_KEY = 'green-pages:landing';
    const MAIN_BANNER_GREEN_PAGES_KEY = 'green-pages:landing';

    public function __construct(GreenPagesServices $greenPages, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        $this->greenPages = $greenPages;

    }


    /**
     *
     * Get Data Green Pages
     * @param array
     * @return array
     */

    public function landing(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_GREEN_PAGES_LANDING_KEY]);
        $data['landing'] = $this->greenPages->getData(["key" => self::MAIN_BANNER_GREEN_PAGES_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.green-pages.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    /**
     *
     * Get Data Green Pages Detail
     * @param array
     * @return array
     */

    public function detail($slug)
    {
        
        $data['detail'] = $this->greenPages->getDetail($slug);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.green-pages.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}