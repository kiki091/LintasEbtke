<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\InvestmentServices as InvestmentServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class InvestmentServicesController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    protected $investmentServices;

    const SEO_INVESTMENT_SERVICES_LANDING_KEY = 'investment-services:landing';
    
    const INVESTMENT_SERVICES_LANDING_REDIS_KEY = 'landing';
    const INVESTMENT_SERVICES_DETAIL_REDIS_KEY = 'detail';


    const MAIN_BANNER_INVESTMENT_SERVICES_PROCEDURE_KEY = 'investment-services-procesure:landing';

    public function __construct(InvestmentServices $investmentServices, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        $this->investmentServices = $investmentServices;

    }

    /**
     *
     * Get Data Investment Services Landing
     * @param array
     * @return array
     */

    public function landing(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_LANDING_KEY]);
        $data['investment_services'] = $this->investmentServices->getData(["key" => self::INVESTMENT_SERVICES_LANDING_REDIS_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }


    /**
     *
     * Get Data Investment Services Detail
     * @param array
     * @return array
     */

    public function detail($slug)
    {
        $data['investment_services'] = $this->investmentServices->getDetail(["slug" => $slug, "key" => self::INVESTMENT_SERVICES_DETAIL_REDIS_KEY]);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }


}