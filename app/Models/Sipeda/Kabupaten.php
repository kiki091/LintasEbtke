<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProyekPowerProducer 
 */
class Kabupaten  extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'kabupaten';

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
    
    public function provinsi()
    {
        return $this->belongsTo('App\Models\Sipeda\Provinsi', 'provinsi_id', 'id');
    }
    
    
    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeProvinsiId($query, $params = true)
    {
        return $query->where('provinsi_id', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}