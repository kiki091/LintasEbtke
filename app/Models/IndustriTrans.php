<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class IndustriTrans extends BaseModel
{
    protected $table = 'industri_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'title',
        'slug'
    ];

    protected $guarded = [];

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }
}