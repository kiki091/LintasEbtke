<?php

namespace App\Listeners\UserContactUs;

use App\Events\UserContactUsEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendSmsNotification
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
     * @param  UserContactUsEvent  $event
     * @return void
     */
    public function handle(UserContactUsEvent $event)
    {
        //
    }
}
