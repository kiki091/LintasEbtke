<?php

namespace App\Models;

use App\Models\BaseModel;

/**
 * Class Nrecc Institution
 */
class NreccCategory extends BaseModel
{
	protected $table = 'nrecc_category';
    public $timestamps = false;

    protected $fillable = [
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
        return $this->hasMany('App\Models\NreccCategoryTrans', 'nrecc_category_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\NreccCategoryTrans', 'id', 'nrecc_category_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function institution()
    {
        return $this->hasMany('App\Models\NreccInstitution', 'nrecc_category_id', 'id')->with('translation');
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