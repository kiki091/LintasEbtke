<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class MenuGroup extends Model
{
    protected $connection = 'auth';
    protected $table = 'menu_group';

    public $timestamps = true;

    protected $fillable = [
        'update_at',
        'created_by'
    ];

    protected $guarded = [];

    /***************** Relationship *****************/

    public function system_menu()
    {
        return $this->belongsTo('App\Models\Auth\System', 'system_id', 'id');
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