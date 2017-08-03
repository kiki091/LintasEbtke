<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\WhitePaper as WhitePaperInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\WhitePaper as WhitePaperServices;
use App\Redis\WhitePaper as WhitePaperRedis;
use App\Services\Transformation\Front\WhitePaper as WhitePaperTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class WhitePaper extends BaseImplementation implements WhitePaperInterface
{
	protected $message;
    protected $whitePaper;
    protected $whitePaperTransformation;


    function __construct(WhitePaperServices $whitePaper, WhitePaperTransformation $whitePaperTransformation)
    {
    	$this->whitePaper = $whitePaper;
    	$this->whitePaperTransformation = $whitePaperTransformation;
    }

    /**
     * Get All Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getPapaers($params)
    {
        
        $params = [
            "is_active" => true,
        ];

        $whitePaperData = $this->whitePaper($params, 'desc', 'array' ,false);

        return $this->whitePaperTransformation->getPapaersTransform($whitePaperData);
        
    }


    /**
     * Get Data By Top Rating
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getPapersTopRated($params)
    {
        
        $params = [
            "is_active" => true,
            "rating" => 20,
        ];

        $whitePaperData = $this->whitePaper($params, 'desc', 'array' ,false);

        return $this->whitePaperTransformation->getPapaersTransform($whitePaperData);
        
    }


    /**
     * Get Data By Top Downloaded
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getPapersTopDownloaded($data)
    {
        
        $params = [
            "is_active" => true,
            "downloaded" => 20,
        ];

        $whitePaperData = $this->whitePaper($params, 'desc', 'array' ,false);

        return $this->whitePaperTransformation->getPapaersTransform($whitePaperData);
       
    }

    /**
     * Get Data Detail
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function getPapersDetail($data)
    {
        
        $params = [
            "is_active" => true,
            "slug" => $data['slug'],
        ];

        $whitePaperData = $this->whitePaper($params, 'desc', 'array' ,true);

        return $this->whitePaperTransformation->getSinglePapaersTransform($whitePaperData);
        
    }


    /**
     * Get All Data Company Organization Structure
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function whitePaper($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $whitePaper = $this->whitePaper
            ->with('translation')
            ->with('translations');

        if(isset($params['slug']) && $params['slug']) {
            $whitePaper->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }
        
        if(isset($params['limit_data'])) {
            $whitePaper->take($params['limit_data']);
        }

        if(isset($params['rating'])) {
            $whitePaper->rating($params['rating']);
        }


        if(isset($params['downloaded'])) {
            $whitePaper->downloaded($params['downloaded']);
        }


        if(isset($params['is_active'])) {
            $whitePaper->isActive($params['is_active']);
        }

        if(isset($params['order_by'])) {
            $whitePaper->orderBy($params['order_by'], $orderType);
        }

        if(!$whitePaper->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $whitePaper->get()->toArray();
                } 
                else 
                {
                    return $whitePaper->first()->toArray();
                }

            break;
        }
    }

}
