<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class KegiatanStudy
 */
class KegiatanStudy extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'kegiatan_study';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
        'topik_kegiatan',
        'tujuan_kegiatan',
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