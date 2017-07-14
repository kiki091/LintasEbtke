<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\WhitePaper as WhitePaperServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Api\Response as ResponseService;

class WhitePaperController extends FrontController
{

    protected $whitePaper;
    protected $seo;
    protected $response;

    const SEO_KEY = 'resources:white-papers';

    const PAPERS_LANDING_REDIS_KEY = 'all';
    const PAPERS_DOWNLOADED_REDIS_KEY = 'downloaded';
    const PAPERS_RATING_REDIS_KEY = 'rating';
    const PAPERS_DETAILS_REDIS_KEY = 'details';

    public function __construct(WhitePaperServices $whitePaper, SeoServices $seo, ResponseService $response)
    {
        $this->whitePaper = $whitePaper;
        $this->seo = $seo;
        $this->response = $response;

    }


    public function landing(Request $request)
    {
        $data['recent_papers'] = $this->whitePaper->getPapaers(["key" => self::PAPERS_LANDING_REDIS_KEY]);
        $data['top_rated'] = $this->whitePaper->getPapersTopRated(["key" => self::PAPERS_RATING_REDIS_KEY]);
        $data['top_downloaded'] = $this->whitePaper->getPapersTopDownloaded(["key" => self::PAPERS_DOWNLOADED_REDIS_KEY]);

        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_KEY]);

        $blade = self::URL_BLADE_FRONT_SITE. '.white-paper.landing';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    public function detail($slug)
    {
        $data['detail_papers'] = $this->whitePaper->getPapersDetail(["slug" => $slug, "key" => self::PAPERS_DETAILS_REDIS_KEY]);
        
        $blade = self::URL_BLADE_FRONT_SITE. '.white-paper.detail';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}