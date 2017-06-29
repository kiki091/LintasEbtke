<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
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

        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('App\Repositories\Contracts\Auth\Users', 'App\Repositories\Implementation\Auth\Users');
        $this->app->bind('App\Repositories\Contracts\Auth\MenuGroup', 'App\Repositories\Implementation\Auth\MenuGroup');
        $this->app->bind('App\Repositories\Contracts\Auth\MenuNavigation', 'App\Repositories\Implementation\Auth\MenuNavigation');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array(
            'App\Repositories\Contracts\Auth\Users',
            'App\Repositories\Contracts\Auth\MenuGroup',
            'App\Repositories\Contracts\Auth\MenuNavigation',
        );
    }
}
