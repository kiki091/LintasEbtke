<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class News Trans
 */
class NreccCategoryTrans extends BaseModel
{
    protected $table = 'nrecc_category_trans';

    public $timestamps = true;

    protected $fillable = [
        'locale',
        'title'
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