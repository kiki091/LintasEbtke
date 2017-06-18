<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
//use App\Services\Bridge\Front\Potential as PotentialServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class PotentialController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    //protected $potential;

    const SEO_INVESTMENT_SERVICES_OTHER_KEY = 'potentials:other';

    public function __construct(MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        //$this->potential = $potential;

    }

    /**
     *
     * Get Data Potensi Other
     * @param array
     * @return array
     */

    public function other(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_OTHER_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.potentials.other.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}