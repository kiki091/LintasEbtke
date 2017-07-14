<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Industri as IndustriServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

use Carbon\Carbon;
use JavaScript;

class IndustriController extends FrontController
{

    protected $industri;
    protected $seo;
    protected $response;

    const SEO_KEY = 'renewable-energy:industri';

    public function __construct(IndustriServices $industri, SeoServices $seo, ResponseService $response)
    {
        $this->industri = $industri;
        $this->seo = $seo;
        $this->response = $response;
    }

    /**
     * Landing pages event services
     */


    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);
        $data['landing_industri'] = $this->industri->getData($request->except('_token'));
        
        $blade = self::URL_BLADE_FRONT_SITE.'.information-services.renewable.industri.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    /**
     * Detail pages event services
     */

    public function detail($slug)
    {
        $data['detail_industri'] = $this->industri->getDetail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.information-services.renewable.industri.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}