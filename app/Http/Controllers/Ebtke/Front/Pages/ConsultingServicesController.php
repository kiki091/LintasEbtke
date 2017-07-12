<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class ConsultingServicesController extends FrontController
{

    protected $seo;
    protected $response;

    const SEO_KEY_COMPANY_HISTORY = 'company:history';

    public function __construct(SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;

    }


    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_HISTORY]);
        $blade = self::URL_BLADE_FRONT_SITE. '.consulting-services.main';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

}