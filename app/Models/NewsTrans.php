<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class NewsTrans extends BaseModel
{
    protected $table = 'news_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'title',
        'introduction',
        'side_description',
        'description'
    ];

    protected $guarded = [];

    

    /**
     * @param $query
     */
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}