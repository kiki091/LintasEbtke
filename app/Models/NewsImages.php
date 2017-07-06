<?php

namespace App\Models;

use App\Models\BaseModel;

class NewsImages extends BaseModel
{
	protected $table = 'news_images';
    public $timestamps = false;

    protected $fillable = [
        'filename'
    ];

    protected $guarded = [];

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}