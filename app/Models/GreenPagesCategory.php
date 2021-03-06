<?php

namespace App\Models;

use App\Models\BaseModel;

class GreenPagesCategory extends BaseModel
{
	protected $table = 'green_pages_category';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by',
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\GreenPagesCategoryTrans', 'green_pages_category_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\GreenPagesCategoryTrans', 'id', 'green_pages_category_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}