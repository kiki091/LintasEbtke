<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class EbtkeServiceProvider extends ServiceProvider
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

        $this->app->bind('App\Repositories\Contracts\Front\MainBanner', 'App\Repositories\Implementation\Front\MainBanner');
        $this->app->bind('App\Repositories\Contracts\Front\ContactUs', 'App\Repositories\Implementation\Front\ContactUs');
        $this->app->bind('App\Repositories\Contracts\Front\News', 'App\Repositories\Implementation\Front\News');
        $this->app->bind('App\Repositories\Contracts\Front\Seo', 'App\Repositories\Implementation\Front\Seo');
        $this->app->bind('App\Repositories\Contracts\Front\Company', 'App\Repositories\Implementation\Front\Company');
        $this->app->bind('App\Repositories\Contracts\Front\WhitePaper', 'App\Repositories\Implementation\Front\WhitePaper');
        $this->app->bind('App\Repositories\Contracts\Front\Tools', 'App\Repositories\Implementation\Front\Tools');
        $this->app->bind('App\Repositories\Contracts\Front\InvestmentServices', 'App\Repositories\Implementation\Front\InvestmentServices');
        $this->app->bind('App\Repositories\Contracts\Front\GreenPages', 'App\Repositories\Implementation\Front\GreenPages');
        $this->app->bind('App\Repositories\Contracts\Front\GreenPagesCategory', 'App\Repositories\Implementation\Front\GreenPagesCategory');
        $this->app->bind('App\Repositories\Contracts\Front\Event', 'App\Repositories\Implementation\Front\Event');
        $this->app->bind('App\Repositories\Contracts\Front\Industri', 'App\Repositories\Implementation\Front\Industri');

        // CMS

        $this->app->bind('App\Repositories\Contracts\Cms\News', 'App\Repositories\Implementation\Cms\News');
        $this->app->bind('App\Repositories\Contracts\Cms\Tags', 'App\Repositories\Implementation\Cms\Tags');

    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array(

            // FRONT
            
            'App\Repositories\Contracts\Front\MainBanner',
            'App\Repositories\Contracts\Front\ContactUs',
            'App\Repositories\Contracts\Front\News',
            'App\Repositories\Contracts\Front\Seo',
            'App\Repositories\Contracts\Front\Company',
            'App\Repositories\Contracts\Front\WhitePaper',
            'App\Repositories\Contracts\Front\Tools',
            'App\Repositories\Contracts\Front\InvestmentServices',
            'App\Repositories\Contracts\Front\GreenPages',
            'App\Repositories\Contracts\Front\GreenPagesCategory',
            'App\Repositories\Contracts\Front\Event',
            'App\Repositories\Contracts\Front\Industri',

            // CMS

            'App\Repositories\Contracts\Cms\News',
            'App\Repositories\Contracts\Cms\Tags',
        );
    }
}
