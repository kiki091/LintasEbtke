<?php

namespace App\Models;

use App\Models\BaseModel;

class MapsCategory extends BaseModel
{
	protected $table = 'maps_category';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\MapsCategoryTrans', 'maps_category_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\MapsCategoryTrans', 'id', 'maps_category_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}