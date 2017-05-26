<?php

namespace App\Providers;

use Route;
use LaravelLocalization;
use App\Models\NavigationTrans;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\LocalizationEvent' => [
            'App\Listeners\LocalizationEventListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        Event::listen('routes.translation', function ($locale, $attributes)
        {
            foreach ($attributes as $name => $value)
            {
                $attributes[$name] = $translatedValue; // get the transated attribute for the given $locale
            }

            return $attributes;
        });
    }
}
