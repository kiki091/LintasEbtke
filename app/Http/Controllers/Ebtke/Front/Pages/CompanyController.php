<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Bridge\Front\Company as CompanyServices;
use App\Services\Api\Response as ResponseService;

class CompanyController extends FrontController
{

    protected $seo;
    protected $mainBanner;
    protected $company;
    protected $response;


    const MAIN_BANNER_COMPANY_HISTORY_KEY = 'banner:company:history';
    const MAIN_BANNER_COMPANY_SCOPE_OF_SERVICES = 'banner:company:scope-of-services';

    const SEO_KEY_COMPANY_HISTORY = 'company:history';
    const SEO_KEY_COMPANY_VISION_AND_MISSION = 'company:vision-mission';
    const SEO_KEY_COMPANY_ORGANIZATION_STRUCTURE = 'company:organization-structure';
    const SEO_KEY_COMPANY_SCOPE_OF_SERVICES = 'company:scope-of-services';

    const REDIS_COMPANY_HISTORY = 'history';
    const REDIS_ORGANIZATION_STRUCTURE = 'organization-structure';

    public function __construct(CompanyServices $company, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->mainBanner = $mainBanner;
        $this->company = $company;
        $this->response = $response;

    }


    public function history(Request $request)
    {
        $data['history'] = $this->company->getCompanyHistory(["key" => self::REDIS_COMPANY_HISTORY]);

        $data['main_banner'] = $this->mainBanner->getMainBanner(["limit_data" => "1","key" => self::MAIN_BANNER_COMPANY_HISTORY_KEY]);
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
        $data['struktur_organisasi'] = $this->company->getOrganizationStructure(["key" => self::REDIS_ORGANIZATION_STRUCTURE]);

        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_ORGANIZATION_STRUCTURE]);

        $blade = self::URL_BLADE_FRONT_SITE. '.company.organization-structure';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function scopeServices(Request $request)
    {
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::MAIN_BANNER_COMPANY_SCOPE_OF_SERVICES]);
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY_COMPANY_SCOPE_OF_SERVICES]);

        $blade = self::URL_BLADE_FRONT_SITE. '.company.scope-of-services';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

}