<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Custom\PusriHelper;

class PusriHelperServiceProvider extends ServiceProvider
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
        $this->app->bind('PusriHelper', function () {
            return new PusriHelper;
        });
    }
}
