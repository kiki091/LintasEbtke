<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Seo as SeoInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Seo as SeoServices;
use App\Models\SeoTrans as SeoTransServices;
use App\Redis\Seo as SeoRedis;
use App\Services\Transformation\Front\Seo as SeoTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Seo extends BaseImplementation implements SeoInterface
{
	protected $message;
    protected $seo;
    protected $seoTrans;
    protected $seoTransformation;


    function __construct(SeoServices $seo, SeoTransServices $seoTrans, SeoTransformation $seoTransformation)
    {
    	$this->seo = $seo;
        $this->seoTrans = $seoTrans;
    	$this->seoTransformation = $seoTransformation;
    }

    public function getSeo($params)
    {
        if(!isset($params['key']))
            return array();


        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(SeoRedis::SEO_LANDING, $params['key']);

        $seoLandingNews = Cache::rememberForever($redisKey, function() use ($params, $redisKey)
        {
            $params = [
                "key" => $this->generateBannerKeyFromRedisKey($redisKey),
                "is_active" => true,
                "order_by" => 'created_at',
                "limit_data" => '1',
            ];

            $seoData = $this->seo($params);

            return $this->seoTransformation->getSeoTransform($seoData, 'asc', 'array', true);
        });

        return $seoLandingNews;
    }

    /**
     * Get All Data Main Banner
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function seo($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $seo = $this->seo
            ->with('translation')
            ->with('translations');

        if(isset($params['key'])) {
            $seo->key($params['key']);
        }

        if(isset($params['limit_data'])) {
            $seo->take($params['limit_data']);
        }

        if(isset($params['order_by'])) {
            $seo->orderBy($params['order_by'], $orderType);
        }

        if(!$seo->count())
            return array();

        switch ($returnType) {
            case 'array':
                if($returnSingle) 
                {
                    return $seo->get()->toArray();
                } 
                else 
                {
                    return $seo->first()->toArray();
                }

            break;
        }
    }

}
