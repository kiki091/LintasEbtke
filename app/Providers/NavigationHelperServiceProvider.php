<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Custom\NavigationHelper;

class NavigationHelperServiceProvider extends ServiceProvider
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
        $this->app->bind('NavigationHelper', function () {
            return new NavigationHelper;
        });
    }
}
