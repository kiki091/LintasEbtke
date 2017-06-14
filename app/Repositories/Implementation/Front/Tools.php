<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\Tools as ToolsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Tools as ToolsServices;
use App\Redis\Tools as ToolsRedis;
use App\Services\Transformation\Front\Tools as ToolsTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Tools extends BaseImplementation implements ToolsInterface
{
	protected $message;
    protected $tools;
    protected $toolsTransformation;


    function __construct(ToolsServices $tools, ToolsTransformation $toolsTransformation)
    {
    	$this->tools = $tools;
    	$this->toolsTransformation = $toolsTransformation;
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getData($params)
    {
        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(ToolsRedis::REDIS_TOOLS_LANDING_KEY, $params['key']);

        $dataTools = Cache::rememberForever($redisKey, function() use ($params, $redisKey)
        {
            $params = [
                "is_active" => true,
            ];

            $toolsData = $this->tools($params, 'desc', 'array' ,false);

            return $this->toolsTransformation->getToolsTransform($toolsData);
        });


        return $dataTools;
    }


    /**
     * Get Data By Top Rating
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getDataTopRated($params)
    {
        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(ToolsRedis::REDIS_TOOLS_TOP_RATING_KEY, $params['key']);

        $dataTools = Cache::rememberForever($redisKey, function() use ($params, $redisKey)
        {
            $params = [
                "is_active" => true,
                "rating" => 20,
            ];

            $toolsData = $this->tools($params, 'desc', 'array' ,false);

            return $this->toolsTransformation->getToolsTransform($toolsData);
        });


        return $dataTools;
    }


    /**
     * Get Data By Top Downloaded
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getDataDownloaded($data)
    {
        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(ToolsRedis::REDIS_TOOLS_TOP_DOWNLOADED_KEY, $data['key']);

        $dataTools = Cache::rememberForever($redisKey, function() use ($data, $redisKey)
        {
            $params = [
                "is_active" => true,
                "downloaded" => 20,
            ];

            $toolsData = $this->tools($params, 'desc', 'array' ,false);

            return $this->toolsTransformation->getToolsTransform($toolsData);
        });


        return $dataTools;
    }

    /**
     * Get Data Detail
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getDetail($data)
    {
        $redisKey   = $this->generateRedisKeyLocationAndReferenceKey(ToolsRedis::REDIS_TOOLS_DETAILS_KEY, $data['key']);

        $dataTools = Cache::rememberForever($redisKey, function() use ($data, $redisKey)
        {
            $params = [
                "is_active" => true,
                "slug" => $data['slug'],
            ];

            $toolsData = $this->tools($params, 'desc', 'array' ,true);

            return $this->toolsTransformation->getSingleToolsTransform($toolsData);
        });


        return $dataTools;
    }


    /**
     * Get All Data Company Organization Structure
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function tools($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $tools = $this->tools
            ->with('translation')
            ->with('translations');

        if(isset($params['limit_data'])) {
            $tools->take($params['limit_data']);
        }

        if(isset($params['rating'])) {
            $tools->rating($params['rating']);
        }


        if(isset($params['downloaded'])) {
            $tools->downloaded($params['downloaded']);
        }


        if(isset($params['slug'])) {
            $tools->slug($params['slug']);
        }


        if(isset($params['is_active'])) {
            $tools->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $tools->orderBy($params['order_by'], $orderType);
        }

        if(!$tools->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $tools->get()->toArray();
                } 
                else 
                {
                    return $tools->first()->toArray();
                }

            break;
        }
    }

}
