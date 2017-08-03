<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 */
class Perusahaan extends Authenticatable
{
    protected $connection = 'sipeda';
    protected $table = 'perusahaan';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'nama_perusahaan',
        'email',
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

    protected $guarded = ['sipeda'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    
    public function role_perusahaan()
    {
        return $this->hasMany('App\Models\Sipeda\RolePerusahaan', 'perusahaan_id', 'id')->with('sipeda_privilage');
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