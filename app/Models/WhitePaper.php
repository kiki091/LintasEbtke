<?php

namespace App\Models;

use App\Models\BaseModel;

class WhitePaper extends BaseModel
{
	protected $table = 'white_paper';
    public $timestamps = true;

    protected $fillable = [
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
        return $this->hasMany('App\Models\WhitePaperTrans', 'white_paper_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\WhitePaperTrans', 'id', 'white_paper_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /***************** Scope *****************/


    /**
     * @param $query
     */
    public function scopeDownloaded($query, $params)
    {
        return $query->where('downloaded', '>' ,$params);
    }

    /**
     * @param $query
     */
    public function scopeRating($query, $params)
    {
        return $query->where('rating', '>' ,$params);
    }

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