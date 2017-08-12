<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ProyekPowerProducer 
 */
class Kecamatan  extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'kecamatan';

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
    
    public function kabupaten()
    {
        return $this->belongsTo('App\Models\Sipeda\Kabupaten', 'kabupaten_id', 'id');
    }
    
    
    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeKabupatenId($query, $params = true)
    {
        return $query->where('kabupaten_id', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}