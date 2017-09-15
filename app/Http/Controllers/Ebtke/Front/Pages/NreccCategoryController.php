<?php

namespace App\Http\Controllers\Ebtke\Front\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\FrontController;
use App\Services\Bridge\Front\NreccCategory as NreccCategoryServices;
use App\Services\Bridge\Front\Seo as SeoServices;
use App\Services\Bridge\Front\MainBanner as MainBannerServices;
use App\Services\Api\Response as ResponseService;

class NreccCategoryController extends FrontController
{

    protected $seo;
    protected $response;
    protected $mainBanner;
    protected $nreccCategory;
    
    const SEO_NRECC_INSTITUTION_KEY = 'nrecc:institution';
    const BANNER_NRECC_INSTITUTION_KEY = 'banner:nrecc:institution';

	public function __construct(NreccCategoryServices $nreccCategory, MainBannerServices $mainBanner, SeoServices $seo, ResponseService $response)
    {
        $this->seo = $seo;
        $this->response = $response;
        $this->mainBanner = $mainBanner;
        $this->nreccCategory = $nreccCategory;

    }

    /**
     *
     * Get Index
     * @param array
     * @return array
     */

    public function index(Request $request)
    {
        
        $data['seo'] = $this->seo->getSeo(["key" => self::SEO_NRECC_INSTITUTION_KEY]);
        $data['main_banner'] = $this->mainBanner->getMainBanner(["key" => self::BANNER_NRECC_INSTITUTION_KEY]);
        $data['nrecc_category'] = $this->nreccCategory->getData();
        $data['nrecc_category_institution'] = $this->nreccCategory->getList();

        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-institution.category';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }

    /**
     *
     * Get Index
     * @param array
     * @return array
     */

    public function detail($slug)
    {
        $data['nrecc_category_institution'] = $this->nreccCategory->getDetail($slug);
        dd($data);
        $blade = self::URL_BLADE_FRONT_SITE. '.link.nrecc-institution.category';
        
        if(view()->exists($blade)) {
        
            return view($blade, $data);

        }

        return abort(404);
    }
}