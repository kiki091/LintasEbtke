<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProyekPowerProducer 
 */
class Desa  extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'desa';

    protected $guard = 'sipeda';
    public $timestamps = false;

    protected $fillable = [
        'name',
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
    
    public function kecamatan()
    {
        return $this->belongsTo('App\Models\Sipeda\Kecamatan', 'kecamatan_id', 'id');
    }
    
    
    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeKecamatanId($query, $params = true)
    {
        return $query->where('kecamatan_id', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}