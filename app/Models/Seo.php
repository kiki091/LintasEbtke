<?php

namespace App\Models;

use App\Models\BaseModel;

class Seo extends BaseModel
{
	protected $table = 'seo';
    public $timestamps = true;

    protected $fillable = [
        'key',
	    'created_at', 
	    'updated_by',
    ];

    protected $guarded = [];

    protected static $logAttributes = ['key'];

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
    public function scopeKey($query, $params)
    {
        return $query->where('key', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}