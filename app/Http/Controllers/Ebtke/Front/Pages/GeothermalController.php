<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
//use App\Services\Bridge\Front\Geothermal as GeothermalServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class GeothermalController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    //protected $geothermal;
    const SEO_INVESTMENT_SERVICES_GEOTHERMAL_KEY = 'potentials:geothermal';
    const SEO_INVESTMENT_SERVICES_GEOTHERMAL_MAPS_KEY = 'potentials:geothermal-maps';

	public function __construct(MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        //$this->geothermal = $geothermal;

    }

    /**
     *
     * Get Maps Data Geothermal Pages
     * @param array
     * @return array
     */

    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_GEOTHERMAL_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.potentials.geothermal.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    /**
     *
     * Get Maps Data Geothermal Pages
     * @param array
     * @return array
     */

    public function maps(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_GEOTHERMAL_MAPS_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.potentials.geothermal.maps';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}