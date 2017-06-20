<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
//use App\Services\Bridge\Front\EnergyConservation as EnergyConservationServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class EnergyConservationController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    //protected $energyConservation;

	const SEO_INVESTMENT_SERVICES_ENERGY_CONSERVATION_KEY = 'investment-services-potentials:energy-conservation';

	public function __construct(MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        //$this->energyConservation = $energyConservation;

    }

    /**
     *
     * Get Data Potensi Energy Conservation
     * @param array
     * @return array
     */
    public function maps(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_ENERGY_CONSERVATION_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.potentials.energy-conservation.maps';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}