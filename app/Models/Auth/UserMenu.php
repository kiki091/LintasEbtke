<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class UserMenu extends Model
{
    protected $connection = 'auth';
    protected $table = 'user_menu';

    public $timestamps = false;

    protected $fillable = [
        'update_at',
        'created_by'
    ];

    protected $guarded = [];


    public function user()
    {
        return $this->hasMany('App\Models\Auth\Users', 'id', 'user_id');
    }


    public function menu()
    {
        return $this->belongsTo('App\Models\Auth\Menu', 'menu_id', 'id');
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}