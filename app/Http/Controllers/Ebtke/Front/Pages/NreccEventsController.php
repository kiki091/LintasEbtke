<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\NreccCategory as NreccCategoryServices;
use App\Services\Bridge\Front\NreccEvents as NreccEventsServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class NreccEventsController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    protected $nreccCategory;
    protected $nreccEvents;
    
    const SEO_NRECC_INSTITUTION_KEY = 'nrecc:institution';
    const BANNER_NRECC_INSTITUTION_KEY = 'banner:nrecc:institution';

	public function __construct(NreccEventsServices $nreccEvents, NreccCategoryServices $nreccCategory, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        $this->nreccCategory = $nreccCategory;
        $this->nreccEvents = $nreccEvents;

    }

    /**
     *
     * Get Index
     * @param array
     * @return array
     */

    public function landing(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_NRECC_INSTITUTION_KEY]);
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::BANNER_NRECC_INSTITUTION_KEY]);
        $data['nrecc_category'] = $this->nreccCategory->getData();
        $data['nrecc_events'] = $this->nreccEvents->getData();
        $data['nrecc_category_events'] = $this->nreccCategory->getDataWithListResources(['limit' => '2']);

        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-events.landing';
        
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
        
        $data['nrecc_events'] = $this->nreccEvents->detail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-events.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}