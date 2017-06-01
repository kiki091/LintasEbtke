<?php

namespace App\Models;

use App\Models\BaseModel;

class MainBanner extends BaseModel
{
	protected $table = 'main_banner';
    public $timestamps = true;

    protected $fillable = [
        'key',
        'order',
	    'created_at', 
	    'updated_by',
        'filename',
        'is_active'
    ];

    protected $guarded = [];

    protected static $logAttributes = ['key','filename'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\MainBannerTrans', 'main_banner_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\MainBannerTrans', 'id', 'main_banner_id')->where('locale', '=' , $this->getCurrentLocalize());
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
    public function scopeKey($query, $params = '')
    {
        return $query->where('key', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params = '')
    {
        return $query->where('id', $params);
    }
}