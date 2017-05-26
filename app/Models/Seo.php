<?php

namespace App\Models;

use App\Models\BaseModel;

class Seo extends BaseModel
{
	protected $table = 'seo';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at'
    ];

    protected $guarded = [];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\SeoTrans', 'seo_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\SeoTrans', 'id', 'seo_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeIsKey($query, $key)
    {
        return $query->where('key', $key);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $id)
    {
        return $query->where('id', $id);
    }
}