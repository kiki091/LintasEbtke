<?php

namespace App\Http\Controllers\Pusri\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\MainBanner as MainBannerService;
use App\Services\Bridge\Front\Company as CompanyService;
use App\Services\Api\Response as ResponseService;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;

class CompanyController extends FrontController
{

    protected $companyProfile;
    protected $mainBanner;
    protected $response;

    const MAIN_BANNER_KEY = 'mainbanner:company';
    const SEO_LANDING_KEY = 'seo:landing';

    public function __construct(MainBannerService $mainBanner, CompanyService $companyProfile, ResponseService $response)
    {

        $this->companyProfile = $companyProfile;
        $this->mainBanner = $mainBanner;
        $this->response = $response;
    }


    public function profile($slug)
    {   
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::MAIN_BANNER_KEY]);
    	$data['data'] = $this->companyProfile->getDetail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.company.profile';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}