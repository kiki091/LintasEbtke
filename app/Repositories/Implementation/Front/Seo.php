<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Seo as SeoInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Seo as SeoServices;
use App\Models\SeoTrans as SeoTransServices;
use App\Services\Transformation\Front\Seo as SeoTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Seo extends BaseImplementation implements SeoInterface
{

    protected $seo;
    protected $seoTrans;
    protected $seoTransformation;

    function __construct(SeoServices $seo, SeoTransServices $seoTrans, SeoTransformation $seoTransformation)
    {
    	$this->seo = $seo;
        $this->seoTrans = $seoTrans;
    	$this->seoTransformation = $seoTransformation;
    }

    public function getSeo($data)
    {

        $params = [
            "key" => $data,
        ];

        $seoData = $this->seo($params);

        return $this->seoTransformation->getSeoTransform($seoData);
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function seo($params = array(), $returnType = 'array', $returnSingle = false)
    {
        $seo = $this->seo
            ->with('translation')
            ->with('translations');

        if(isset($params['key'])) {
            $seo->iskey($params['key']);
        }

        if(isset($params['id'])) {
            $seo->id($params['id']);
        }

        if(!$seo->count())
            return array();

        return $seo->first()->toArray();
    }
}