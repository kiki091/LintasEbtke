<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Related
 */
class NewsRelated extends BaseModel
{
    protected $table = 'news_related';

    public $timestamps = true;

    protected $fillable = [
        'news_id',
        'news_related_id'
    ];

    protected $guarded = [];

    /**
     * @return mixed
     */
    public function related_news()
    {
        return $this->belongsTo('App\Models\News', 'news_related_id', 'id')->with('translation');
    }
}