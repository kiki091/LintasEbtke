<!DOCTYPE html>
<html lang="en">

	@include('ebtke.cms.partials.head')
	<body>

		<div class="login__background">
      		<div class="login_wrapper">
        		<div class="animate form login_form">
          			<section class="login_content">
              			<form role="form" method="POST" action="{{ route('registered') }}" id="UserFormRegistration">
            				<h1>Registration Form</h1>
                    		@if (count($errors) > 0)
                          		@foreach ($errors->all() as $error)
                              		<p class="error--state--message">{{ $error }}</p>
                          		@endforeach
                    		@else
                        		<p>Please enter your username and password to login</p>
                    		@endif

            				<div class="form-group">
            					<label style="float: left;">Name</label>
              					<input type="text" class="form-control" placeholder="Name" value="{{ old('name') }}" name="name" required="required" />
            				</div>

            				<div class="form-group">
            					<label style="float: left;">Email</label>
              					<input type="email" class="form-control" placeholder="Email" value="{{ old('email') }}" name="email" required="required" />
            				</div>
            				
            				<div class="form-group">
            					<label style="float: left;">Password</label>
              					<input type="password" class="form-control" placeholder="Password" name="password" required="required" />
            				</div>

            				<div class="form-group">
            					<label style="float: left;">Confirm Password</label>
              					<input type="password" class="form-control" placeholder="Password" name="confirm_password" required="required" />
            				</div>
            				<div>
                          <input type="hidden" name="_token" value="{{ csrf_token() }}">
                          <button class="btn__submit__login">Submit</button>
                        
                  		</form>
          			</section>
        		</div>
        	</div>
      	</div>
	</body>
</html>