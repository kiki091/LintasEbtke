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
        'App\Events\UserRegistrationEvent' => [
            'App\Listeners\UserRegistration\SendSmsNotification',
            'App\Listeners\UserRegistration\SendEmailNotification',
            'App\Listeners\UserRegistration\SendWebNotification',
        ],
        'App\Events\UserContactUsEvent' => [
            'App\Listeners\UserContactUs\SendSmsNotification',
            'App\Listeners\UserContactUs\SendEmailNotification',
            'App\Listeners\UserContactUs\SendWebNotification',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Event::listen('routes.translation', function($locale, $attributes)
        {
            /*$locale = LaravelLocalization::getCurrentLocale();
            foreach( $attributes as $k => $v ){
                if($k === 'slug'){
                    $attributes[$k] = RouteTranslator::translateSlug($v, $locale);
                }
            }
            return $attributes;*/

            return $attributes;
            
        });
    }
}
