<?php

namespace App\Repositories\Implementation\Cms;

use App\Repositories\Contracts\Cms\Tags as TagsInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Tag as TagsModels;
use App\Models\TagTrans as TagsTransModels;
use App\Services\Transformation\Cms\Tags as TagsTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class Tags extends BaseImplementation implements TagsInterface
{

    protected $tags;
    protected $tagsTrans;
    protected $tagsTransformation;

    protected $message;
    protected $lastInsertId;

    function __construct(TagsModels $tags, TagsTransModels $tagsTrans, TagsTransformation $tagsTransformation)
    {

    	$this->tags = $tags;
    	$this->tagsTrans = $tagsTrans;
    	$this->tagsTransformation = $tagsTransformation;
    }

    /**
     * Get Data
     * @param $data
     * @return array
     */

    public function getData($data)
    {
        $params = [

            "order_by" => 'order',
        ];

        $tagsData = $this->tags($params, 'desc', 'array', false);

        return $this->tagsTransformation->getTagsCmsTransform($tagsData);
    }

    /**
     * Get All Data 
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function tags($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $tags = $this->tags->with(['translation', 'translations']);

        if(isset($params['limit_data'])) {
            $tags->take($params['limit_data']);
        }

        if(isset($params['is_active'])) {
            $tags->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $tags->orderBy($params['order_by'], $orderType);
        }

        if(!$tags->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $tags->get()->toArray();
                } 
                else 
                {
                    return $tags->first()->toArray();
                }

            break;
        }
    }
}