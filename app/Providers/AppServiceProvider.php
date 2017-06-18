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

        $this->app->bind('App\Repositories\Contracts\Front\MainBanner', 'App\Repositories\Implementation\Front\MainBanner');
        $this->app->bind('App\Repositories\Contracts\Front\News', 'App\Repositories\Implementation\Front\News');
        $this->app->bind('App\Repositories\Contracts\Front\Seo', 'App\Repositories\Implementation\Front\Seo');
        $this->app->bind('App\Repositories\Contracts\Front\Company', 'App\Repositories\Implementation\Front\Company');
        $this->app->bind('App\Repositories\Contracts\Front\WhitePaper', 'App\Repositories\Implementation\Front\WhitePaper');
        $this->app->bind('App\Repositories\Contracts\Front\Tools', 'App\Repositories\Implementation\Front\Tools');
        $this->app->bind('App\Repositories\Contracts\Front\InvestmentServices', 'App\Repositories\Implementation\Front\InvestmentServices');
        $this->app->bind('App\Repositories\Contracts\Front\GreenPages', 'App\Repositories\Implementation\Front\GreenPages');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array(

            'App\Repositories\Contracts\Front\MainBanner',
            'App\Repositories\Contracts\Front\News',
            'App\Repositories\Contracts\Front\Seo',
            'App\Repositories\Contracts\Front\Company',
            'App\Repositories\Contracts\Front\WhitePaper',
            'App\Repositories\Contracts\Front\Tools',
            'App\Repositories\Contracts\Front\InvestmentServices',
            'App\Repositories\Contracts\Front\GreenPages',

        );
    }
}
