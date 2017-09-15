<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\NreccResources as NreccResourcesServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class NreccResourcesController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    protected $nreccCategory;
    protected $nreccResources;
    
    const SEO_NRECC_RESOURCES_KEY = 'nrecc:resources';
    const BANNER_NRECC_RESOURCES_KEY = 'banner:nrecc:resources';

	public function __construct(NreccResourcesServices $nreccResources, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        $this->nreccResources = $nreccResources;

    }

    /**
     *
     * Get Index
     * @param array
     * @return array
     */

    public function landing(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_NRECC_RESOURCES_KEY]);
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::BANNER_NRECC_RESOURCES_KEY]);
        $data['nrecc_resources'] = $this->nreccResources->getData();
dd($data);
        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-resources.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    /**
     *
     * Get Detail
     * @param array
     * @return array
     */

    public function detail($slug)
    {
        
        $data['nrecc_resources'] = $this->nreccResources->detail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-resources.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}