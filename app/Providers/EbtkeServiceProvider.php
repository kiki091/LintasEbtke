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
        $this->app->bind('App\Repositories\Contracts\Front\EnergyConservation', 'App\Repositories\Implementation\Front\EnergyConservation');

        // CMS

        $this->app->bind('App\Repositories\Contracts\Cms\News', 'App\Repositories\Implementation\Cms\News');
        $this->app->bind('App\Repositories\Contracts\Cms\Tags', 'App\Repositories\Implementation\Cms\Tags');
        $this->app->bind('App\Repositories\Contracts\Cms\Event', 'App\Repositories\Implementation\Cms\Event');
        $this->app->bind('App\Repositories\Contracts\Cms\CompanyHistory', 'App\Repositories\Implementation\Cms\CompanyHistory');
        $this->app->bind('App\Repositories\Contracts\Cms\MainBanner', 'App\Repositories\Implementation\Cms\MainBanner');
        $this->app->bind('App\Repositories\Contracts\Cms\GreenPagesCategory', 'App\Repositories\Implementation\Cms\GreenPagesCategory');
        $this->app->bind('App\Repositories\Contracts\Cms\GreenPages', 'App\Repositories\Implementation\Cms\GreenPages');
        $this->app->bind('App\Repositories\Contracts\Cms\InvestmentServices', 'App\Repositories\Implementation\Cms\InvestmentServices');
        $this->app->bind('App\Repositories\Contracts\Cms\WhitePapers', 'App\Repositories\Implementation\Cms\WhitePapers');
        $this->app->bind('App\Repositories\Contracts\Cms\Tools', 'App\Repositories\Implementation\Cms\Tools');
        $this->app->bind('App\Repositories\Contracts\Cms\Industry', 'App\Repositories\Implementation\Cms\Industry');
        $this->app->bind('App\Repositories\Contracts\Cms\EnergyConservation', 'App\Repositories\Implementation\Cms\EnergyConservation');
        $this->app->bind('App\Repositories\Contracts\Cms\Province', 'App\Repositories\Implementation\Cms\Province');
        $this->app->bind('App\Repositories\Contracts\Cms\ListCertifiedEnergy', 'App\Repositories\Implementation\Cms\ListCertifiedEnergy');
        $this->app->bind('App\Repositories\Contracts\Cms\ListEnergyAuditor', 'App\Repositories\Implementation\Cms\ListEnergyAuditor');

        // SEO CMS
        $this->app->bind('App\Repositories\Contracts\Cms\Seo', 'App\Repositories\Implementation\Cms\Seo');


        // MESSAGE CMS
        $this->app->bind('App\Repositories\Contracts\Cms\ContactUs', 'App\Repositories\Implementation\Cms\ContactUs');

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
            'App\Repositories\Contracts\Front\EnergyConservation',

            // CMS

            'App\Repositories\Contracts\Cms\News',
            'App\Repositories\Contracts\Cms\Tags',
            'App\Repositories\Contracts\Cms\Event',
            'App\Repositories\Contracts\Cms\CompanyHistory',
            'App\Repositories\Contracts\Cms\MainBanner',
            'App\Repositories\Contracts\Cms\GreenPagesCategory',
            'App\Repositories\Contracts\Cms\GreenPages',
            'App\Repositories\Contracts\Cms\InvestmentServices',
            'App\Repositories\Contracts\Cms\WhitePapers',
            'App\Repositories\Contracts\Cms\Tools',
            'App\Repositories\Contracts\Cms\Industry',
            'App\Repositories\Contracts\Cms\Province',
            'App\Repositories\Contracts\Cms\ListCertifiedEnergy',
            'App\Repositories\Contracts\Cms\ListEnergyAuditor',

            // Seo

            'App\Repositories\Contracts\Cms\Seo',

            // Message

            'App\Repositories\Contracts\Cms\ContactUs',
        );
    }
}
