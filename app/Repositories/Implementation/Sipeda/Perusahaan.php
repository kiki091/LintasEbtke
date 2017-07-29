<?php

namespace App\Repositories\Implementation\Sipeda;

use App\Repositories\Contracts\Sipeda\Perusahaan as UserInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Sipeda\Perusahaan as UserModel;
use App\Custom\SipedaDataHelper;
use App\Services\Transformation\Sipeda\Perusahaan as UserTransformation;
//use App\Events\UserRegistrationEvent;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Perusahaan extends BaseImplementation implements UserInterface
{

    protected $user;
    protected $message;
    protected $lastInsertId;

    function __construct(UserModel $user, UserTransformation $userTransformation)
    {

        $this->user = $user;
        $this->userTransformation = $userTransformation;
    }

	/**
     * Set Auth Session
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function setSipedaAuthSession($params)
    {

        $sipedaInfo = Auth::guard('sipeda')->user();

        if (empty($sipedaInfo)) {
           return false;
        }

        $sipedaId = !empty($sipedaInfo) && isset($sipedaInfo['id']) ?  $sipedaInfo['id'] : '';

        $params = [
            'id' => $userId,
            'is_active' => true,
        ];

        $userData = $this->user($params, 'asc', 'array', true);

        if(empty($userData))
            return false;

        $data = $this->userTransformation->getAuthSessionTransform($userData);

        Session::forget('sipeda_user_info');
        Session::put('sipeda_user_info', $data);

        
        return $data;
    }

    

    /**
     * Get All User
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function user($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $user = $this->user->with(['role_perusahaan']);

        if(isset($params['id'])) {
            $user->userId($params['id']);
        }

        if(isset($params['is_active'])) {
            $user->isActive($params['is_active']);
        }

        if(isset($params['order'])) {
            $user->orderBy($params['order'], $orderType);
        }

        if(isset($params['email'])) {
            $user->email($params['email']);
        }

        if(!$user->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $user->get()->toArray();
                } else {
                    return $user->first()->toArray();
                }
                break;
        }
    }
}