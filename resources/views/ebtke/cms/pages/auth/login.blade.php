<!DOCTYPE html>
<html lang="en">

	@include('ebtke.cms.partials.header')
	<body class="login">

		<div>
      		<a class="hiddenanchor" id="signup"></a>
      		<a class="hiddenanchor" id="signin"></a>

      		<div class="login_wrapper">
        		<div class="animate form login_form">
          			<section class="login_content">
              			<form role="form" method="POST" action="{{ route('authenticate') }}">
            				<h1>Login Form</h1>
                    		@if (count($errors) > 0)
                          		@foreach ($errors->all() as $error)
                              		<p class="error--state--message">{{ $error }}</p>
                          		@endforeach
                    		@else
                        		<p>Please enter your username and password to login</p>
                    		@endif
            				<div>
              					<input type="email" class="form-control" placeholder="Email" value="{{ old('email') }}" name="email" required="required" />
            				</div>
            				
            				<div>
              					<input type="password" class="form-control" placeholder="Password" name="password" required="required" />
            				</div>
                          	<input type="hidden" name="_token" value="{{ csrf_token() }}">
                          	<div>
			                	<button class="btn btn-default submit" type="submit">Log in</button>
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

        		<div id="register" class="animate form registration_form">
          			<section class="login_content">
            			<form role="form" method="POST" action="{{ route('registered') }}" id="UserFormRegistration">
              				<h1>Create Account</h1>
			              	<div>
			                	<input type="text" name="name" class="form-control" placeholder="Fullname" required="" />
			              	</div>
              				<div>
                				<input type="email" name="email" class="form-control" placeholder="Email" required="" />
              				</div>
              				<div>
                				<input type="password" name="password" class="form-control" placeholder="Password" required="" />
              				</div>
              				<div>
                				<input type="password" name="confirm_password" class="form-control" placeholder="Confirm Password" required="" />
              				</div>
              				<div>
                				<a class="btn btn-default submit" href="index.html">Submit</a>
              				</div>

              				<div class="clearfix"></div>

              				<div class="separator">
                				<p class="change_link">Already a member ?
                  					<a href="#signin" class="to_register"> Log in </a>
                				</p>

                				<div class="clearfix"></div>
                				
              				</div>
            			</form>
          			</section>
        		</div>
        	</div>
      	</div>

	</body>
</html>