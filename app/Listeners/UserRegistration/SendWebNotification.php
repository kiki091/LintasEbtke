<?php

namespace App\Listeners\UserRegistration;

use App\Events\UserRegistrationEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendWebNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  UserRegistrationEvent  $event
     * @return void
     */
    public function handle(UserRegistrationEvent $event)
    {
        //
    }
}
