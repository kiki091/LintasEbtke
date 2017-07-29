<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class SipedaServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
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
        );
    }
}
