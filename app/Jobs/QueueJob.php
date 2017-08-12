<?php

namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Events\Status as StatusService;

class QueueJob implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $queue_job_count = 50;
    private $channelId = '';

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($channelId)
    {
        $this->channelId = $channelId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // ==
        event(new StatusService($this->channelId));
        // ======== END OF =================
    }


    public function failed()
    {
        // Called when the job is failing...

    }
}
