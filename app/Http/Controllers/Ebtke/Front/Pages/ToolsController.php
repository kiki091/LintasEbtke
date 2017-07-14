<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\Tools as ToolsServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class ToolsController extends FrontController
{

    protected $tools;
    protected $seo;
    protected $response;

    const SEO_KEY = 'resources:tools';
    const REDIS_TOOLS_LANDING_KEY = 'landing';

    public function __construct(ToolsServices $tools, SeoServices $seo, ResponseService $response)
    {
        $this->tools = $tools;
        $this->seo = $seo;
        $this->response = $response;

    }


    public function landing(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);
        $data['tools_landing'] = $this->tools->getData(["key" => self::REDIS_TOOLS_LANDING_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.tools.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function detail($slug)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.tools.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}