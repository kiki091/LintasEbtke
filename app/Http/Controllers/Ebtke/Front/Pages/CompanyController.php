<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class CompanyController extends FrontController
{

    protected $seo;
    protected $response;

    const SEO_KEY_COMPANY_HISTORY = 'company:history';
    const SEO_KEY_COMPANY_VISION_AND_MISSION = 'company:vision-mission';
    const SEO_KEY_COMPANY_ORGANIZATION_STRUCTURE = 'company:organization-structure';
    const SEO_KEY_COMPANY_SCOPE_OF_SERVICES = 'company:scope-of-services';

    public function __construct(SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;

    }


    public function history(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_HISTORY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.company.history';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function visionMision(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_VISION_AND_MISSION]);

        $blade = self::URL_BLADE_FRONT_SITE. '.company.vision-mission';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function organizationStructure(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_ORGANIZATION_STRUCTURE]);

        $blade = self::URL_BLADE_FRONT_SITE. '.company.organization-structure';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function scopeServices(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_SCOPE_OF_SERVICES]);

        $blade = self::URL_BLADE_FRONT_SITE. '.company.scope-of-services';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

}