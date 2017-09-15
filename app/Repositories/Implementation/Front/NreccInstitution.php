<?php

namespace App\Repositories\Implementation\Front;

use App\Repositories\Contracts\Front\NreccInstitution as NreccInstitutionInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\NreccInstitution as NreccInstitutionServices;
use App\Models\NreccInstitutionTrans as NreccInstitutionTransServices;
use App\Services\Transformation\Front\NreccInstitution as NreccInstitutionTransformation;
use LaravelLocalization;
use Cache;
use Session;
use DB;

class NreccInstitution extends BaseImplementation implements NreccInstitutionInterface
{
	protected $message;
    protected $nreccInstitution;
    protected $nreccInstitutionTrans;
    protected $nreccInstitutionTransformation;


    function __construct(NreccInstitutionServices $nreccInstitution, NreccInstitutionTransServices $nreccInstitutionTrans, NreccInstitutionTransformation $nreccInstitutionTransformation)
    {
    	$this->nreccInstitution = $nreccInstitution;
        $this->nreccInstitutionTrans = $nreccInstitutionTrans;
    	$this->nreccInstitutionTransformation = $nreccInstitutionTransformation;
    }

    /**
     * Get Data Nrecc Institution
     * @param $data
     * @return Json array
     */
    public function getData($data)
    {

        $params = [
            "is_active" => true,
            "order_by" => 'order',
            "limit_data" => isset($data['limit']) ? $data['limit'] : '',
        ];

        $nreccInstitutionData = $this->nreccInstitution($params, 'desc', 'array', false);

        return $this->nreccInstitutionTransformation->getNreccInstitutionTransform($nreccInstitutionData);
        
    }

    /**
     * Get Detail Nrecc Institution
     * @param $data
     * @return Json array
     */
    public function detail($slug)
    {

        $params = [
            "is_active" => true,
            "slug" => $slug,
        ];

        $nreccInstitutionData = $this->nreccInstitution($params, 'desc', 'array', true);
        $addViewer = $this->addViewer($params);

        return $this->nreccInstitutionTransformation->getNreccInstitutionDetailTransform($nreccInstitutionData);
        
    }

    /**
     * Get All Data Nrecc Institution
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function nreccInstitution($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $nreccInstitution = $this->nreccInstitution
            ->with('translation')
            ->with('translations')
            ->with('category');

        if(isset($params['slug']) && $params['slug']) {
            $nreccInstitution->whereHas('translation', function($q) use($params) {
                $q->slug($params['slug']);
            });
        }

        if(isset($params['is_active'])) {
            $nreccInstitution->isActive($params['is_active']);
        }

        if(isset($params['limit'])) {
            $nreccInstitution->take($params['limit']);
        }

        if(isset($params['order_by'])) {
            $nreccInstitution->orderBy('order', $orderType);
        }

        if(!$nreccInstitution->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) 
                {
                    return $nreccInstitution->get()->toArray();
                } 
                else 
                {
                    return $nreccInstitution->first()->toArray();
                }

            break;
        }
    }

    /**
     * Add Viewers
     * @param $data
     */
    public function addViewer($params)
    {
        try {

            $blogKey = 'nrecc_institution_detail_' . $params['slug'];

            $this->nreccInstitution->whereHas('translation', function($q) use($params) {
                $q->where('slug', $params['slug']);
            })->increment('total_view');
            
        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

}
