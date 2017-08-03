<?php

namespace App\Models\Sipeda;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Lokasi
 */
class Lokasi extends Model
{
    protected $connection = 'sipeda';
    protected $table = 'lokasi';

    protected $guard = 'sipeda';
    public $timestamps = true;

    protected $fillable = [
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

    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeUserId($query, $params = true)
    {
        return $query->where('id', $params);
    }
}