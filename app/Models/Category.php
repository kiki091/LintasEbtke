<?php

namespace App\Models;

use App\Models\BaseModel;

class Category extends BaseModel
{
	protected $table = 'category';
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
        return $this->hasMany('App\Models\CategoryTrans', 'category_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\CategoryTrans', 'id', 'category_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @param $query
     */
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }


    /**
     * @param $query
     */
    public function scopeId($query, $params = '')
    {
        return $query->where('id', $params);
    }
}