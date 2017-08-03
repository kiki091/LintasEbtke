<?php

namespace App\Models;

use App\Models\BaseModel;

class Provinsi extends BaseModel
{
	protected $table = 'provinsi';
    public $timestamps = false;

    protected $fillable = [
	    'created_at', 
	    'updated_by'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function pulau()
    {
        return $this->belongsTo('App\Models\Pulau', 'pulau_id', 'id');
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}