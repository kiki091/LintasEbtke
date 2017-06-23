<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Event as EventServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

use Carbon\Carbon;
use JavaScript;

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

        JavaScript::put([
            'event_url' => route('GetDataEvent'),
        ]);
    }

    /**
     * Landing pages event services
     */


    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);
        /*$data['data'] = $this->event->getData($request->except('_token'));
        dd($data['data']);*/
        $blade = self::URL_BLADE_FRONT_SITE. '.event.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    /**
     * Get data event services
     */

    public function getData(Request $request)
    {
        return $this->event->getData($request->except('_token'));
    }

    /**
     * Detail pages event services
     */

    public function detail($slug)
    {
        $data['detail_event'] = $this->event->getDetail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.event.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}