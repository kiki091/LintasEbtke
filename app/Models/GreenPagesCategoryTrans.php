<?php

namespace App\Models;

use App\Models\BaseModel;

class GreenPagesCategoryTrans extends BaseModel
{
	protected $table = 'green_pages_category_trans';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by',
    ];

    protected $guarded = [];


    /**
     * @param $query
     */
    public function scopeSlug($query, $params)
    {
        return $query->where('slug', $params);
    }
}