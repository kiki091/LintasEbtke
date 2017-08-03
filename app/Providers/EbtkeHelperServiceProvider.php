<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Custom\EbtkeHelper;

class EbtkeHelperServiceProvider extends ServiceProvider
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
        $this->app->bind('EbtkeHelper', function () {
            return new EbtkeHelper;
        });
    }
}
