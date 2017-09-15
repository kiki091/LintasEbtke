<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\NreccEvents as NreccEventsServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class NreccEventsController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    protected $nreccEvents;
    
    const SEO_NRECC_EVENT_KEY = 'nrecc:event';
    const BANNER_NRECC_EVENT_KEY = 'banner:nrecc:event';

	public function __construct(NreccEventsServices $nreccEvents, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
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
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_NRECC_EVENT_KEY]);
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::BANNER_NRECC_EVENT_KEY]);
        $data['nrecc_events'] = $this->nreccEvents->getData();

        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-event.landing';
        
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