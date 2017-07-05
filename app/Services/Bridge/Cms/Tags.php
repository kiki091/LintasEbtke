<?php

namespace App\Services\Bridge\Cms;

use App\Repositories\Contracts\Cms\Tags as TagsInterface;

class Tags
{
	protected $tags;

    public function __construct(TagsInterface $tags)
    {
        $this->tags = $tags;
    }


    /**
     * @param $params
     * @return mixed
     */
    public function getData($params = [])
    {
        return $this->tags->getData($params);
    }

}