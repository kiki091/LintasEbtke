<?php

namespace App\Models;

use App\Models\BaseModel;

class Tag extends BaseModel
{
	protected $table = 'tag';
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
        return $this->hasMany('App\Models\TagTrans', 'tag_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\TagTrans', 'id', 'tag_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return mixed
     */
    public function news()
    {
        return $this->hasMany('App\Models\News', 'tag_id', 'id')->with('translation');
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
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}