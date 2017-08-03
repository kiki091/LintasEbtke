<!-- top navigation -->
<div class="top_nav">
  	<div class="nav_menu">
    	<nav>
      		<div class="nav toggle">
        		<a id="menu_toggle"><i class="fa fa-bars"></i></a>
      		</div>
      		<ul class="nav navbar-nav navbar-right">
      			<li class="">
                  	<a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    	{{ DataHelper::userEmail() }}
                    	<span class=" fa fa-angle-down"></span>
                 	 </a>
                  	<ul class="dropdown-menu dropdown-usermenu pull-right">
                    	<li>
                    		<a href="#changes-password" data-toggle="modal" data-target=".bs-example-modal-lg"> 
	                    		<i class="fa fa-lock pull-right"></i>
	                    		Change Password</a>
                    	</li>
                    	<li>
	                    	<a href="#logout" onclick="logout()">
	                    		<i class="fa fa-sign-out pull-right"></i>
	                    	 	Log Out
	                    	</a>
                    	</li>
                  	</ul>
                </li>
      		</ul>
    	</nav>
  	</div>
</div>
<!-- /top navigation -->

<!-- Form Change Password -->
<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                	<span aria-hidden="true">×</span>
               	</button>
                <h4 class="modal-title" id="myModalLabel">CHANGE PASSWORD</h4>
            </div>
            <form id="FormChangePassword" action="{{ route('ChangePassword') }}" method="POST">
            <div class="modal-body">
                <div class="x_panel">
                	<div class="x_content">
                		<br/>
                		<div class="form-horizontal form-label-left">
                			<div class="form-group">
                				<label class="control-label col-md-3 col-sm-3 col-xs-12">
                					Old Password <span class="required">*</span>
                				</label>
                				<div class="col-md-6 col-sm-6 col-xs-12">
                					<input type="password" name="old_password" id="old_password" class="form-control col-md-7 col-xs-12">
                					<span id="form--error--message--old_password" class="form--error--message"></span>
                				</div>
                			</div>
                			<div class="form-group">
                				<label class="control-label col-md-3 col-sm-3 col-xs-12">
                					New Password <span class="required">*</span>
                				</label>
                				<div class="col-md-6 col-sm-6 col-xs-12">
                					<input type="password" name="new_password" id="new_password" class="form-control col-md-7 col-xs-12">
                					<span id="form--error--message--new_password" class="form--error--message"></span>
                				</div>
                			</div>
                			<div class="form-group">
                				<label class="control-label col-md-3 col-sm-3 col-xs-12">
                					Confirm Password <span class="required">*</span>
                				</label>
                				<div class="col-md-6 col-sm-6 col-xs-12">
                					<input type="password" name="confirm_password" id="confirm_password" class="form-control col-md-7 col-xs-12">
                					<span id="form--error--message--confirm_password" class="form--error--message"></span>
                				</div>
                			</div>
                		</div>
                	</div>
                </div>
            </div>
           	<div class="modal-footer">
           		<input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
                
                <button type="button" id="close__button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>

                <button type="submit" id="submit__button" class="btn btn-primary pull-right">Save changes</button>
            </div>
            </form>
        </div>
    </div>
</div>
