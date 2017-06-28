<!DOCTYPE html>
<html lang="en">
	@section('pageheadtitle')
		User Account
	@endsection
	@include('ebtke.cms.partials.header')
	<body class="login">

		<div>
      		<a class="hiddenanchor" id="signup"></a>
      		<a class="hiddenanchor" id="signin"></a>

<!-- 
  _    ___   ___ ___ _  _  __      _____ ____  _   ___ ___  
 | |  / _ \ / __|_ _| \| | \ \    / /_ _|_  / /_\ | _ \   \ 
 | |_| (_) | (_ || || .` |  \ \/\/ / | | / / / _ \|   / |) |
 |____\___/ \___|___|_|\_|   \_/\_/ |___/___/_/ \_\_|_\___/ 
                                                            
-->
      		<div class="login_wrapper">
          		<div class="animate form login_form">
              		<section class="login_content">
                  		<form role="form" method="POST" action="{{ route('authenticate') }}">
                    		<h1>Login Form</h1>
                        	@if (count($errors) > 0)
                              	@foreach ($errors->all() as $error)
                                  	<p class="form--error--message">{{ $error }}</p>
                              	@endforeach
                        	@else
                            	<p>Please enter your username and password to login</p>
                        	@endif

                    		<div class="form-group">
                      			<input type="email" class="form-control" placeholder="Email" value="{{ old('email') }}" name="email" required="required" />
                    		</div>
                    				
                    		<div class="form-group">
                      			<input type="password" class="form-control" placeholder="Password" name="password" required="required" />
                    		</div>

                            <div class="form-group">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
        			            <button class="btn btn-primary submit" type="submit">Log in</button>
        			            <a class="reset_pass" href="#">Lost your password?</a>
        			        </div>

        			        <div class="clearfix"></div>

        			        <div class="separator">
                        		<p class="change_link">New to site?
                          			<a href="#signup" class="to_register"> Create Account </a>
                        		</p>
                        	</div>
                        </form>
              		</section>
          		</div>

<!--
  ___ ___ ___ ___ ___ _____ ___    _ _____ ___ ___  _  _  __      _____ ____  _   ___ ___  
 | _ \ __/ __|_ _/ __|_   _| _ \  /_\_   _|_ _/ _ \| \| | \ \    / /_ _|_  / /_\ | _ \   \ 
 |   / _| (_ || |\__ \ | | |   / / _ \| |  | | (_) | .` |  \ \/\/ / | | / / / _ \|   / |) |
 |_|_\___\___|___|___/ |_| |_|_\/_/ \_\_| |___\___/|_|\_|   \_/\_/ |___/___/_/ \_\_|_\___/ 

-->

          		<div id="register" class="animate form registration_form">
              		<section class="login_content">
                  		<form method="POST" action="{{ route('registered') }}" id="UserFormRegistration">
                    		<h1>Create Account</h1>
      			            <div class="form-group">
      			            	<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
                					Fullname <span class="required">*</span>
                					<span id="form--error--message--name" class="form--error--message pull-right"></span>
                				</label>
      			                <input type="text" name="name" id="name" class="form-control" placeholder="Fullname"/>
                              	
      			            </div>
                    		<div class="form-group">
      			            	<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
                					Email <span class="required">*</span>
                					<span id="form--error--message--email" class="form--error--message pull-right"></span>
                				</label>
                      			<input type="email" name="email" id="email" class="form-control" placeholder="Email"/>
                              	
                    		</div>
                    		<div class="form-group">
                    			<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
                					Password <span class="required">*</span>
                					<span id="form--error--message--password" class="form--error--message pull-right"></span>
                				</label>
                      			<input type="password" name="password" id="password" class="form-control" placeholder="Password"/>
                    		</div>
                    		<div class="form-group">
                    			<label class="text__left control-label col-md-12 col-sm-12 col-xs-12">
                					Confirm Password <span class="required">*</span>
                					<span id="form--error--message--confirm_password" class="form--error--message pull-right"></span>
                				</label>
                      			<input type="password" name="confirm_password" id="confirm_password" class="form-control" placeholder="Confirm Password"/>
                    		</div>
                    		<div class="separator">
                    			<p class="change_link pull-left">Already a member ?
                        			<a href="#signin" class="to_register"> Log in </a>
                      			</p>
                              	<input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
                      			<button type="submit" id="submit__button" class="btn btn-primary submit pull-right">Register</a>
                    		</div>
                  		</form>
              		</section>
          		</div>
        	</div>
    	</div>
    	<div id="custom_notifications" class="custom-notifications dsp_none">
        	<ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
        	</ul>
        	<div class="clearfix"></div>
        	<div id="notif-group" class="tabbed_notifications"></div>
    	</div>
    	@include('ebtke.cms.partials.js_footer')
    	<script src="{{ asset('themes/ebtke/cms/pages/auth/registration.js') }}"></script>
	</body>
</html>