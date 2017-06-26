<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class TagTrans extends BaseModel
{
    protected $table = 'tag_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'title',
        'slug'
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