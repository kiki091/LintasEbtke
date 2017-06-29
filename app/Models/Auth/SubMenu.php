<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 */
class SubMenu extends Model
{
    protected $connection = 'auth';
    protected $table = 'sub_menu';

    public $timestamps = true;

    protected $fillable = [
        'update_at',
        'created_by'
    ];

    protected $guarded = [];


    /***************** Relationship *****************/

    public function menu_sub()
    {
        return $this->belongsTo('App\Models\Auth\Menu', 'menu_id', 'id');
    }


    /***************** Scope *****************/

    /**
     * @param $query
     */
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }


    /**
     * @param $query
     */
    public function scopeUrl($query, $url)
    {
        return $query->where('url', $url);
    }

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