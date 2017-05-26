<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
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
        if ($this->app->environment() !== 'production') {
            $this->app->register(\Way\Generators\GeneratorsServiceProvider::class);
            $this->app->register(\Xethron\MigrationsGenerator\MigrationsGeneratorServiceProvider::class);
        }

        $this->app->bind('App\Repositories\Contracts\Front\Navigation', 'App\Repositories\Implementation\Front\Navigation');
        $this->app->bind('App\Repositories\Contracts\Front\MainBanner', 'App\Repositories\Implementation\Front\MainBanner');
        $this->app->bind('App\Repositories\Contracts\Front\Company', 'App\Repositories\Implementation\Front\Company');
        $this->app->bind('App\Repositories\Contracts\Front\Category', 'App\Repositories\Implementation\Front\Category');
        $this->app->bind('App\Repositories\Contracts\Front\NewsAndEvent', 'App\Repositories\Implementation\Front\NewsAndEvent');
        $this->app->bind('App\Repositories\Contracts\Front\Gcg', 'App\Repositories\Implementation\Front\Gcg');
        $this->app->bind('App\Repositories\Contracts\Front\Gp3k', 'App\Repositories\Implementation\Front\Gp3k');
        $this->app->bind('App\Repositories\Contracts\Front\Seo', 'App\Repositories\Implementation\Front\Seo');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array(

            'App\Repositories\Contracts\Front\Navigation',
            'App\Repositories\Contracts\Front\MainBanner',
            'App\Repositories\Contracts\Front\Company',
            'App\Repositories\Contracts\Front\Category',
            'App\Repositories\Contracts\Front\NewsAndEvent',
            'App\Repositories\Contracts\Front\Gcg',
            'App\Repositories\Contracts\Front\Gp3k',
            'App\Repositories\Contracts\Front\Seo',

        );
    }
}
