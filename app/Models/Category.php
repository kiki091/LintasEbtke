<?php

namespace App\Models;

use App\Models\BaseModel;

class Category extends BaseModel
{
	protected $table = 'category';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at',
        'is_active'
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

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeIsActive($query, $params = true)
    {
        return $query->where('is_active', $params);
    }

    /**
     * @param $query
     */
    public function scopeIsLanding($query, $params = true)
    {
        return $query->where('is_landing', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params = '')
    {
        return $query->where('id', $params);
    }
}