<?php

namespace App\Repositories\Implementation\Auth;

use App\Custom\RouteMenuLocation;
use App\Repositories\Contracts\Auth\Users as UserInterface;
use App\Repositories\Implementation\BaseImplementation;
use App\Models\Auth\Users as UserModel;
use App\Models\Auth\SystemLocation as SystemLocationModel;
use App\Models\Auth\UserMenu as UserMenuModel;
use App\Models\Auth\Role as RoleModel;
use App\Models\Auth\UserMenu as UserMenuNavigationModel;
use App\Custom\Facades\DataHelper;
use App\Services\Transformation\Auth\Users as UserTransformation;
use App\Events\UserRegistrationEvent;
use Cache;
use Session;
use DB;
use Auth;
use Hash;

class Users extends BaseImplementation implements UserInterface
{

    protected $user;
    protected $role;
    protected $userNavigation;
    protected $userMenuNavigation;
    protected $userSystemLocation;
    protected $userTransformation;

    protected $message;
    protected $lastInsertId;

    function __construct(UserModel $user, SystemLocationModel $userSystemLocation, UserMenuModel $userNavigation, RoleModel $role, UserMenuNavigationModel $userMenuNavigation, UserTransformation $userTransformation)
    {

        $this->user = $user;
        $this->role = $role;
        $this->userNavigation = $userNavigation;
        $this->userMenuNavigation = $userMenuNavigation;
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

            $store->password             = Hash::make($data['confirm_password']);

            if($save = $store->save()) {

                // Generate event for notification user registration
                
                //event(new UserRegistrationEvent($data));
                broadcast(new UserRegistrationEvent($data['email']))->toOthers();
            }
            
            return $save;

        } catch (\Exception $e) {
            $this->message = $e->getMessage();
            return false;
        }

    }

    /**
     * Check email has use or not
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    protected function checkUserMail($data)
    {
        try {
            
            if(!$this->isEditMode($data)) {
                $usersEmail = $this->user->email($data['email'])->first();

                if($usersEmail['email'] == NULL) {

                    return true;    
                }
                else{
                    return false;
                }
            }

            return true;

        } catch (Exception $e) {
            return $this->setResponse($e->getMessage(), false);
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

            if($this->checkUserMail($data) == true) {

                if ($this->storeUserAccount($data) != true) {
                    DB::rollBack();
                    return $this->setResponse($this->message, false);
                }

                if ($this->storeUserSystemControl($data) != true) {
                    DB::rollBack();
                    return $this->setResponse($this->message, false);
                }

                if ($this->storeUserPrivilageControl($data) != true) {
                    DB::rollBack();
                    return $this->setResponse($this->message, false);
                }

                if ($this->storeUserNavigationControl($data) != true) {
                    DB::rollBack();
                    return $this->setResponse($this->message, false);
                }

                DB::commit();
                return $this->setResponse(trans('message.cms_success_store_data_general'), true);

            } else {
                DB::rollBack();
                return $this->setResponse(trans('message.cms_failed_mail_exist'), false);
            }

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
     * Store Data User Privilage Control Into Database
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */

    protected function storeUserPrivilageControl($data)
    {
        try {

            if(!isset($data['privilage_id']))
                    return true;

            if ($this->isEditMode($data)) {
                $this->removeUserPrivilageControl($data['id']);
            }

            $finalData = [
                "user_id" => $this->lastInsertId,
                "privilage_id" => $data['privilage_id'],
            ];
                
            if ($this->role->insert($finalData) != true) {
                $this->message = trans('message.cms_failed_store_data_privilage_access');
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
     * Remove Data User Privilage Control Into Database
     * @param $diningOfferId
     * @return bool
     */
    protected function removeUserPrivilageControl($id)
    {
        if (empty($id))
            return false;

        return $this->role->where('user_id', $id)->delete();
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
     * Edit data user manager
     * @param $diningOfferId
     * @return bool
     */

    public function edit($data)
    {
        $params = [
            'id' => $data['id'],
        ];

        $userData = $this->user($params, 'asc', 'array', true);
        
        $data['user'] = $this->userTransformation->getSingleUserEditTransform($userData);
        $data['user_role'] = $this->role($params);
        $data['system_location'] = $this->userSystemLocation($params);
        $data['menu_navigation'] = $this->userMenuNavigation($params);

        return $this->setResponse(trans('message.cms_success_get_data'), true, $data);
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


    /**
     * Get All Data User Role
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function role($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {
        $role = $this->role;

        if(isset($params['id'])) {
            $role = RoleModel::where('user_id', $params['id']);
        }

        if(!$role->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $role->get()->toArray();
                } else {
                    return $role->first()->toArray();
                }
                break;
        }
    }


    /**
     * Get All Data System Location
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function userSystemLocation($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {

        $userSystemLocation = $this->userSystemLocation;

        if(isset($params['id'])) {
            $userSystemLocation = SystemLocationModel::where('user_id', $params['id']);
        }

        if(!$userSystemLocation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $userSystemLocation->get()->toArray();
                } else {
                    return $userSystemLocation->first()->toArray();
                }
                break;
        }
    }


    /**
     * Get All Data Menu Navigation
     * Warning: this function doesn't redis cache
     * @param array $params
     * @return array
     */
    
    protected function userMenuNavigation($params = array(), $orderType = 'desc', $returnType = 'array', $returnSingle = false)
    {

        $userMenuNavigation = $this->userMenuNavigation;

        if(isset($params['id'])) {
            $userMenuNavigation = UserMenuNavigationModel::where('user_id', $params['id']);
        }

        if(!$userMenuNavigation->count())
            return array();

        switch ($returnType) {
            case 'array':
                if(!$returnSingle) {
                    return $userMenuNavigation->get()->toArray();
                } else {
                    return $userMenuNavigation->first()->toArray();
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