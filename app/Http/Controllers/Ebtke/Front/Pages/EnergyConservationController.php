<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\EnergyConservation as EnergyConservationServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

use JavaScript;
use Carbon\Carbon;

class EnergyConservationController extends FrontController
{

    protected $seo;
    protected $response;
    protected $energyConservation;

	const SEO_INVESTMENT_SERVICES_ENERGY_CONSERVATION_KEY = 'investment-services-potentials:energy-conservation';

	public function __construct(EnergyConservationServices $energyConservation, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->energyConservation = $energyConservation;

        JavaScript::put([
            'maps_data' => route('InvestmentServicesPotentialsEnergyConservationMapsData'),
        ]);
    }

    /**
     *
     * Get Data Potensi Energy Conservation
     * @param array
     * @return array
     */
    public function landing(Request $request)
    {
        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.potentials.energy-conservation.maps';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);
    }

    public function maps(Request $request)
    {
        return $this->energyConservation->showMapsData($request->except(['_token']));
    }
}