<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\ListCertifiedEnergy as ListCertifiedEnergyServices;
use App\Services\Bridge\Front\ListEnergyAuditor as ListEnergyAuditorServices;
use App\Services\Bridge\Front\Industri as IndustriServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

use Carbon\Carbon;
use JavaScript;

class ListCertifiedEnergyController extends FrontController
{

    protected $seo;
    protected $industri;
    protected $listEnergyAuditor;
    protected $listCertifiedEnergy;
    protected $response;

    const SEO_KEY = 'renewable-energy:industri';

    public function __construct(IndustriServices $industri, ListCertifiedEnergyServices $listCertifiedEnergy,ListEnergyAuditorServices $listEnergyAuditor, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->industri = $industri;
        $this->listEnergyAuditor = $listEnergyAuditor;
        $this->listCertifiedEnergy = $listCertifiedEnergy;
        $this->response = $response;
    }

    /**
     * Landing pages event services
     */


    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);
        $data['certified_energy'] = $this->listCertifiedEnergy->getData($request->except('_token'));
        $data['landing_industri'] = $this->industri->getData($request->except('_token'));

        $blade = self::URL_BLADE_FRONT_SITE.'.information-services.renewable.industri.certified-energy';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}