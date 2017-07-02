<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class Users extends Model
{
    protected $connection = 'auth';
    protected $table = 'users';

    public $timestamps = true;

    protected $fillable = [
        'is_active',
        'location_id',
        'name',
        'email',
        'password',
        'update_at',
        'created_by'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $guarded = [];

    public function role()
    {
        return $this->hasMany('App\Models\Auth\Role', 'user_id', 'id')->with('privilage');
    }


    public function user_menu()
    {
        return $this->hasMany('App\Models\Auth\UserMenu', 'user_id', 'id')->with('menu');
    }

    public function location()
    {
        return $this->belongsTo('App\Models\Auth\Location', 'location_id', 'id');
    }

    public function system_location()
    {
        return $this->hasMany('App\Models\Auth\SystemLocation', 'user_id', 'id')->with('system');
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
    public function scopeEmail($query, $email)
    {
        return $query->where('email', $email);
    }

    /**
     * @param $query
     */
    public function scopeUserId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}