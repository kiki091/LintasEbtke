<?php

namespace App\Repositories\Implementation\Auth;

use App\Custom\RouteMenuLocation;
use App\Repositories\Contracts\Auth\Users as UserInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Auth\Users as UserModel;
use App\Models\Auth\SystemLocation as SystemLocationModel;
use App\Models\Auth\UserMenu as UserMenuModel;
use App\Custom\Facades\DataHelper;
use App\Services\Transformation\Auth\Users as UserTransformation;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Users extends BaseImplementation implements UserInterface
{

    protected $user;
    protected $userNavigation;
    protected $userSystemLocation;
    protected $userTransformation;

    protected $message;
    protected $lastInsertId;

    function __construct(UserModel $user, SystemLocationModel $userSystemLocation, UserMenuModel $userNavigation, UserTransformation $userTransformation)
    {

        $this->user = $user;
        $this->userNavigation = $userNavigation;
        $this->userSystemLocation = $userSystemLocation;
        $this->userTransformation = $userTransformation;
    }

	/**
     * Set Auth Session
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    public function setAuthSession($params)
    {

        $userInfo = Auth::user();

        if (empty($userInfo)) {
           return false;
        }

        $userId = !empty($userInfo) && isset($userInfo['id']) ?  $userInfo['id'] : '';

        $params = [
            'id' => $userId,
            'is_active' => true,
            'current_location_slug' => true,
        ];

        $userData = $this->user($params, 'asc', 'array', true);

        if(empty($userData))
            return false;

        $data = $this->userTransformation->getAuthSessionTransform($userData);

        Session::forget('user_info');
        Session::put('user_info', $data);

        
        return $data;
    }

    /**
     * Get Data
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function getData($data)
    {
        $params = [
            'order'     => 'name',
        ];

        $userData = $this->user($params, 'asc', 'array', false);

        return $this->userTransformation->getUserTransform($userData);
    }

    /**
     * Registered User Account
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */
    
    public function registered($data)
    {
        try {
            DB::beginTransaction();

            if ($this->registeredUser($data)) {
                //TODO: send mail first
                DB::commit();
                return $this->setResponse(trans('message.user_success_created'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.user_failed_created'), false);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Change Status Menu Group
     * Warning: this function doesn't redis cache
     * @param $params
     * @return array
     */

    public function changeStatus($data)
    {
     
        try {

            if (!isset($data['id']) && empty($data['id']))

                return $this->setResponse(trans('message.cms_required_id'), false);

            DB::beginTransaction();

            $oldData = $this->user->userId($data['id'])->first()->toArray();

            $updatedData = [
                'is_active' => $oldData['is_active'] ? false : true,
                'updated_at' => $this->mysqlDateTimeFormat()
            ];

            $changeStatus = $this->user->userId($data['id'])->update($updatedData);

            if($changeStatus) {
                DB::commit();
                return $this->setResponse(trans('message.cms_success_update_status_general'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.cms_failed_update_status_general'), false);
        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Change Password
     * @param $data
     */
    public function changePassword($data)
    {
        try {
            DB::beginTransaction();

            if ($this->changePasswordUser($data)) {
                //TODO: send mail first
                DB::commit();
                return $this->setResponse(trans('message.user_success_change_password'), true);
            }

            DB::rollBack();
            return $this->setResponse(trans('message.user_failed_change_password'), false);

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Change Password User
     * @param $data
     */
    protected function changePasswordUser($data)
    {
        $userId = Auth::id();
        
        try {
            
            $users = UserModel::find($userId);

            if(Hash::check($data['old_password'], $users['password']))
            {
                $users['password']      = Hash::make($data['new_password']);
                $save = $users->save();
                return $save;    
            }
            else
                return false;
        } catch (Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Registration By User
     * @param $data
     */

    protected function registeredUser($data)
    {
        try {

            $store                       = $this->user;

            $store->name                 = isset($data['name']) ? $data['name'] : '';
            $store->email                = isset($data['email']) ? $data['email'] : '';
            $store->is_active            = false;
            $store->location_id          = "1";

            $store->password      = Hash::make($data['confirm_password']);

            $save = $store->save();

            return $save;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }

    }

    /**
     * Store Data
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    public function store($data)
    {
        try {

            DB::beginTransaction();

            if ($this->storeUserAccount($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            if ($this->storeUserSystemControl($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            if ($this->storeUserNavigationControl($data) != true) {
                DB::rollBack();
                return $this->setResponse($this->message, false);
            }

            DB::commit();
            return $this->setResponse(trans('message.cms_success_store_data_general'), true);

        } catch (\Exception $e) {
            return $this->setResponse($e->getMessage(), false);
        }
    }

    /**
     * Store Data User Account Into Database
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    protected function storeUserAccount($data)
    {
        try {

            $store              = $this->user;

            if ($this->isEditMode($data)) {
                $store          = $this->user->find($data['id']);
            }

            $store->name        = isset($data['name']) ? $data['name'] : '';
            $store->email       = isset($data['email']) ? $data['email'] : '';
            $store->password    = Hash::make($data['confirm_password']);
            $store->location_id = isset($data['location_id']) ? $data['location_id'] : '';

            if (!$this->isEditMode($data)) {
                $store->is_active  = true;
            }

            if($save = $store->save()) {
                $this->lastInsertId = $store->id;
            }

            return $save;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Store Data User System Control Into Database
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    protected function storeUserSystemControl($data)
    {
        try {

            if(!isset($data['system_id']))
                    return true;

            if ($this->isEditMode($data)) {
                $this->removeUserSystemControl($data['id']);
            }

            $finalData = [];
                
            foreach ($data['system_id'] as $key => $value) {

                $finalData[] = [
                    "user_id" => $this->lastInsertId,
                    "system_id" => $value,
                ];
                
            }

            if ($this->userSystemLocation->insert($finalData) != true) {
                $this->message = trans('message.cms_failed_store_data_system_access');
                return false;
            }

            return true;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Store Data User Navigation Control Into Database
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    protected function storeUserNavigationControl($data)
    {
        try {

            if(!isset($data['menu_id']))
                    return true;

            if ($this->isEditMode($data)) {
                $this->removeUserNavigationControl($data['id']);
            }

            $finalData = [];
                
            foreach ($data['menu_id'] as $key => $value) {

                $finalData[] = [
                    "user_id" => $this->lastInsertId,
                    "menu_id" => $value,
                ];
                
            }

            if ($this->userNavigation->insert($finalData) != true) {
                $this->message = trans('message.cms_failed_store_data_navigation_access');
                return false;
            }

            return true;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }
    }

    /**
     * Remove Data User System Control Into Database
     * @param $diningOfferId
     * @return bool
     */
    protected function removeUserSystemControl($id)
    {
        if (empty($id))
            return false;

        return $this->userSystemLocation->where('user_id', $id)->delete();
    }

    /**
     * Remove Data User Navigation Control
     * @param $diningOfferId
     * @return bool
     */
    protected function removeUserNavigationControl($id)
    {
        if (empty($id))
            return false;

        return $this->userNavigation->where('user_id', $id)->delete();
    }

    /**
     * Get All User
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    protected function user($params = array(), $orderType = 'asc', $returnType = 'array', $returnSingle = false)
    {
        $user = $this->user->with(['role','location','user_menu', 'system_location']);

        if(isset($params['id'])) {
            $user->userId($params['id']);
        }

        if(isset($params['is_active'])) {
            $user->isActive($params['is_active']);
        }

        if(isset($params['order'])) {
            $user->orderBy($params['order'], $orderType);
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

    /**
     * Check need edit Mode or No
     * @param $data
     * @return bool
     */
    protected function isEditMode($data)
    {
        return isset($data['id']) && !empty($data['id']) ? true : false;
    }
}