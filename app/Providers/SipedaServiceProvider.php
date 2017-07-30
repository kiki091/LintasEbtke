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
        );
    }
}
