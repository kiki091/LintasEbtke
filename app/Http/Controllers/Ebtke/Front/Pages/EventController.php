<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\News as EventServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class EventController extends FrontController
{

    protected $event;
    protected $seo;
    protected $response;

    const SEO_KEY = 'landing:event';

    public function __construct(EventServices $event, SeoServices $seo, ResponseService $response)
    {
        $this->event = $event;
        $this->seo = $seo;
        $this->response = $response;

    }


    public function landing(Request $request)
    {
        $data['latest_event'] = $this->event->getEventHome();
        $data['popular_event'] = $this->event->getPopularEvent();
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.event.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function detail($slug)
    {
        $data['detail_event'] = $this->event->getNewsDetail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.event.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}