<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TechnicalAssistance
 */
class TechnicalAssistance extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'technical_assistance';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'judul_topik',
        'request_topik',
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
    
    public function perusahaan()
    {
        return $this->hasMany('App\Models\Sipeda\Perusahaan', 'perusahaan_id', 'id');
    }

    public function lokasi()
    {
        return $this->hasMany('App\Models\Sipeda\Lokasi', 'lokasi_id', 'id');
    }

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeUserId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}