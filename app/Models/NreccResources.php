<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Nrecc Resources
 */
class NreccResources extends BaseModel
{
	protected $table = 'nrecc_resources';
    public $timestamps = false;

    protected $fillable = [
        'thumbnail',
        'order',
	    'created_at', 
	    'updated_by',
        'is_active'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\NreccResourcesTrans', 'nrecc_resources_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\NreccResourcesTrans', 'id', 'nrecc_resources_id')->where('locale', '=' , $this->getCurrentLocalize());
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function category()
    {
        return $this->belongsTo('App\Models\NreccCategory', 'nrecc_category_id', 'id')->with('translation');
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