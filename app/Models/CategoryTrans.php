<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class CategoryTrans extends BaseModel
{
    protected $table = 'category_trans';

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