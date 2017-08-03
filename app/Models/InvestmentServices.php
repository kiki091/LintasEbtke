<?php

namespace App\Models;

use App\Models\BaseModel;

class InvestmentServices extends BaseModel
{
	protected $table = 'investment_services';
    public $timestamps = false;

    protected $fillable = [
        'thumbnail',
        'slug',
        'order',
	    'created_at', 
	    'updated_by',
        'is_active'
    ];

    protected $guarded = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function translations()
    {
        return $this->hasMany('App\Models\InvestmentServicesTrans', 'investment_services_id', 'id');
    }

    /**
     * @return mixed
     */
    public function translation()
    {
        return $this->belongsTo('App\Models\InvestmentServicesTrans', 'id', 'investment_services_id')->where('locale', '=' , $this->getCurrentLocalize());
    }

    /**
     * @return mixed
     */
    public function related()
    {
        return $this->hasMany('App\Models\InvestmentServicesRelated', 'investment_services_id', 'id')->with('related_investment_services');
    }

    /**
     * @return mixed
     */
    public function images()
    {
        return $this->hasMany('App\Models\InvestmentServicesImages', 'investment_services_id', 'id');
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
    public function scopeSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }


    /**
     * @param $query
     */
    public function scopePopular($query, $params)
    {
        return $query->where('total_view', '>', $params);
    }

    /**
     * @param $query
     */
    public function scopeId($query, $params)
    {
        return $query->where('id', $params);
    }
}