<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class SipedaServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // FRONT

        $this->app->bind('App\Repositories\Contracts\Sipeda\Perusahaan', 'App\Repositories\Implementation\Sipeda\Perusahaan');
        $this->app->bind('App\Repositories\Contracts\Sipeda\CapacityBuilding', 'App\Repositories\Implementation\Sipeda\CapacityBuilding');
        $this->app->bind('App\Repositories\Contracts\Sipeda\ProyekPowerProducer', 'App\Repositories\Implementation\Sipeda\ProyekPowerProducer');
        $this->app->bind('App\Repositories\Contracts\Sipeda\InvestasiPowerProducer', 'App\Repositories\Implementation\Sipeda\InvestasiPowerProducer');
        $this->app->bind('App\Repositories\Contracts\Sipeda\InvestasiPabrikanAnekaEbt', 'App\Repositories\Implementation\Sipeda\InvestasiPabrikanAnekaEbt');
        $this->app->bind('App\Repositories\Contracts\Sipeda\InvestasiPltsRooftop', 'App\Repositories\Implementation\Sipeda\InvestasiPltsRooftop');


        $this->app->bind('App\Repositories\Contracts\Sipeda\Provinsi', 'App\Repositories\Implementation\Sipeda\Provinsi');
        $this->app->bind('App\Repositories\Contracts\Sipeda\Kabupaten', 'App\Repositories\Implementation\Sipeda\Kabupaten');
        $this->app->bind('App\Repositories\Contracts\Sipeda\Kecamatan', 'App\Repositories\Implementation\Sipeda\Kecamatan');
        $this->app->bind('App\Repositories\Contracts\Sipeda\Desa', 'App\Repositories\Implementation\Sipeda\Desa');

    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array(

            'App\Repositories\Contracts\Sipeda\Perusahaan',
            'App\Repositories\Contracts\Sipeda\CapacityBuilding',
            'App\Repositories\Contracts\Sipeda\ProyekPowerProducer',
            'App\Repositories\Contracts\Sipeda\InvestasiPowerProducer',
            'App\Repositories\Contracts\Sipeda\InvestasiPabrikanAnekaEbt',
            'App\Repositories\Contracts\Sipeda\InvestasiPltsRooftop',

            
            'App\Repositories\Contracts\Sipeda\Provinsi',
            'App\Repositories\Contracts\Sipeda\Kabupaten',
            'App\Repositories\Contracts\Sipeda\Kecamatan',
            'App\Repositories\Contracts\Sipeda\Desa',
        );
    }
}
