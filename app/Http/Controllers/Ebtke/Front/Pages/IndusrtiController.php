<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Indusrti as IndusrtiServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

use Carbon\Carbon;
use JavaScript;

class IndusrtiController extends FrontController
{

    protected $indusrti;
    protected $seo;
    protected $response;

    const SEO_KEY = 'landing:indusrti';

    public function __construct(IndusrtiServices $indusrti, SeoServices $seo, ResponseService $response)
    {
        $this->indusrti = $indusrti;
        $this->seo = $seo;
        $this->response = $response;
    }

    /**
     * Landing pages event services
     */


    public function landing(Request $request)
    {
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);
        $data['indusrti'] = $this->indusrti->getData($request->except('_token'));
        
        $blade = self::URL_BLADE_FRONT_SITE. '.renewable..indusrti.landing';
        
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
        $data['detail_indusrti'] = $this->indusrti->getDetail($slug);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.renewable..indusrti.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}