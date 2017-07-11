<?php

namespace App\Http\Controllers\Ebtke\Cms\Pages;

use Illuminate\Http\Request;
use App\Http\Controllers\CmsBaseController;
use App\Custom\DataHelper;
use App\Services\Bridge\Cms\WhitePapers as WhitePapersServices;
use App\Services\Api\Response as ResponseService;

use Validator;
use ValidatesRequests;
use Response;
use Session;
use Auth;

class WhitePapersController extends CmsBaseController
{

    protected $whitePapers;
    protected $response;
    protected $validationMessage = '';

    public function __construct(WhitePapersServices $whitePapers,ResponseService $response)
    {
        $this->whitePapers = $whitePapers;
        $this->response = $response;
    }

    /**
     * Index Of Event
     * @return string
     */
    public function index(Request $request)
    {
        $blade = self::URL_BLADE_CMS. '.resources.white-papers.main';
        
        if(view()->exists($blade)) {
        
            return view($blade);

        }

        return abort(404);

    }

    /**
     * Get Data Of News
     * @return string
     */

    public function getData(Request $request)
    {
        $data['white_papers'] = $this->whitePapers->getData();
        return $this->response->setResponse(trans('message.success_get_data'), true, $data);
    }

    /**
     * Store Data
     * @param Request $request
     */

    public function store(Request $request)
    {//dd($request->all());
        $validator = Validator::make($request->all(), $this->validationStore($request));

        if ($validator->fails()) {
            //TODO: case fail
            return $this->response->setResponseErrorFormValidation($validator->messages(), false);

        } else {
            //TODO: case pass
            return $this->whitePapers->store($request->except(['_token']));
        }

    }

    /**
     * Edit Data
     * @param Request $request
     */
    public function edit(Request $request)
    {
        return $this->whitePapers->edit($request->except(['_token']));
    }

    /**
     * Change Status Data
     * @param Request $request
     */
    public function changeStatus(Request $request)
    {
        return $this->whitePapers->changeStatus($request->except(['_token']));
    }

    /**
     * Delete Data
     * @param Request $request
     */
    public function delete(Request $request)
    {
        return $this->whitePapers->delete($request->except(['_token']));
    }

    /**
     * Ordering
     * @param Request $request
     * @return mixed
     */
    public function order(Request $request)
    {
        return $this->whitePapers->order($request->input('list_order'));
    }


    /**
     * Validation Store Landing Offers
     * @return array
     */
    private function validationStore($request = array())
    {
        $rules = [
            'title.*'               => 'required',
            'slug.*'                => 'required',
            'description.*'         => 'required',
            'meta_title.*'          => 'required',
            'meta_keyword.*'        => 'required',
            'meta_description.*'    => 'required',
            'event_related_id.*'    => 'required',
            'thumbnail'             => 'required|dimensions:width='.WHITE_PAPERS_THUMBNAIL_WIDTH.',height='.WHITE_PAPERS_THUMBNAIL_HEIGHT.'|max:'. WHITE_PAPERS_IMAGES_SIZE .'|mimes:jpeg,jpg',
            'file'                  => 'required|max:'. WHITE_PAPERS_FILE_UPLOAD_SIZE .'|mimes:pdf,doc,docx,ppt,xls,xlxs',
        ];

        if ($this->isEditMode($request->input())) {

            if (is_null($request->file('thumbnail'))) {
                unset($rules['thumbnail']);
            }

            if (is_null($request->file('file'))) {
                unset($rules['file']);
            }
        }

        return $rules;
    }
    
    /**
     * Check is edit mode or no
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }
}