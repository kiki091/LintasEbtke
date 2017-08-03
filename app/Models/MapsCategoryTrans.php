<?php

namespace App\Models;

use App\Models\BaseModel;

class MapsCategoryTrans extends BaseModel
{
	protected $table = 'maps_category_trans';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by'
    ];

    protected $guarded = [];

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}