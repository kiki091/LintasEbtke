<?php

namespace App\Services\Bridge\Front;

use App\Repositories\Contracts\Front\WhitePaper as WhitePaperInterface;

class WhitePaper
{
	protected $whitePaper;

    public function __construct(WhitePaperInterface $whitePaper)
    {
        $this->whitePaper = $whitePaper;
    }


    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getPapaers($params = [])
    {
        return $this->whitePaper->getPapaers($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getPapersTopRated($params)
    {
        return $this->whitePaper->getPapersTopRated($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getPapersTopDownloaded($params)
    {
        return $this->whitePaper->getPapersTopDownloaded($params);
    }

    /**
     * Get Data Top Navigation
     * @param $params
     * @return mixed
     */
    public function getPapersDetail($slug)
    {
        return $this->whitePaper->getPapersDetail($slug);
    }
}