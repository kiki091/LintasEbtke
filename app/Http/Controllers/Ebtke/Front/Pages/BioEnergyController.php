<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
//use App\Services\Bridge\Front\BioEnergy as BioEnergyServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class BioEnergyController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    //protected $bioEnergy;
    const SEO_INVESTMENT_SERVICES_BIO_ENERGY_KEY = 'potentials:bio-energy';

	public function __construct(MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        //$this->bioEnergy = $bioEnergy;

    }

    /**
     *
     * Get Data Potensi Bio Energy
     * @param array
     * @return array
     */


    public function maps(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_BIO_ENERGY_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.potentials.bio-energy.maps';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}