<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
//use App\Services\Bridge\Front\Procedure as ProcedureServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;

class ProcedureController extends FrontController
{
	protected $seo;
    protected $response;
    protected $mainBanner;
    //protected $procedure;
    const SEO_INVESTMENT_SERVICES_BIO_ENERGY_KEY = 'potentials:bio-energy';
    const SEO_INVESTMENT_SERVICES_PROCEDURE_KEY = 'investment-services-procesure:landing';
    
	public function __construct(MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        //$this->procedure = $procedure;

    }

    /**
     *
     * Get Data procedure
     * @param array
     * @return array
     */

    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_INVESTMENT_SERVICES_PROCEDURE_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.investment-services.procedure.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}