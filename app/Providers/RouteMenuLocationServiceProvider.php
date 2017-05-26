<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Custom\RouteMenuLocation;

class RouteMenuLocationServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('RouteMenuLocation', function () {
            return new RouteMenuLocation;
        });
    }
}
