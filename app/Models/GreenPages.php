<?php

namespace App\Models;

use App\Models\BaseModel;

class GreenPages extends BaseModel
{
	protected $table = 'green_pages';
    public $timestamps = false;

    protected $fillable = [
        'thumbnail',
        'slug',
        'order',
	    'created_at', 
	    'updated_by',
        'is_active'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function category()
    {
        return $this->belongsTo('App\Models\GreenPagesCategory', 'green_pages_category_id', 'id')->with('translation');
    }

    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\GreenPagesTrans', 'green_pges_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\GreenPagesTrans', 'id', 'green_pges_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function images()
    {
        return $this->hasMany('App\Models\GreenPagesImages', 'green_pges_id', 'id');
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
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}