<?php

namespace App\Models;

use App\Models\BaseModel;

class Gp3k extends BaseModel
{
	protected $table = 'gp3k';
    public $timestamps = true;

    protected $fillable = [
	    'created_at', 
	    'updated_at',
        'is_active',
        'is_landing'
    ];

    protected $guarded = [];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\Gp3kTrans', 'gp3k_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\Gp3kTrans', 'id', 'gp3k_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return mixed
     */
    public function tag_translation()
    {
        return $this->hasMany('App\Models\TagTrans', 'tag_id', 'id')->where('locale', '=' , $this->getCurrentLocalize());
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