<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class SystemLocation extends Model
{
    protected $connection = 'auth';
    protected $table = 'system_location';

    public $timestamps = true;

    protected $fillable = [
        'update_at',
        'created_by'
    ];

    protected $guarded = [];



    /***************** Relationship *****************/

    public function system()
    {
        return $this->belongsTo('App\Models\Auth\System', 'system_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo('App\Models\Auth\Users', 'user_id', 'id');
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}