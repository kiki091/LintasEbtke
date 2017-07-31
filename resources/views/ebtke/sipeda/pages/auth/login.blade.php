<!DOCTYPE html>
<html lang="en">
	@section('pageheadtitle')
		SIPEDA LOGIN PAGES
	@endsection
	@include('ebtke.sipeda.partials.header')
	<body class="login">

		<div>
      		<a class="hiddenanchor" id="signup"></a>
      		<a class="hiddenanchor" id="signin"></a>
          <a class="hiddenanchor" id="job"></a>

          <!-- 
            _    ___   ___ ___ _  _  __      _____ ____  _   ___ ___  
           | |  / _ \ / __|_ _| \| | \ \    / /_ _|_  / /_\ | _ \   \ 
           | |_| (_) | (_ || || .` |  \ \/\/ / | | / / / _ \|   / |) |
           |____\___/ \___|___|_|\_|   \_/\_/ |___/___/_/ \_\_|_\___/ 
                                                                      
          -->
      		<div class="login_wrapper">
          		<div id="login" class="animate form login_form">
              		<section class="login_content">
                  		<form role="form" method="POST" action="{{ route('sipeda_authenticate') }}">
                    		<h1>Welcome Back !!</h1>
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
        			            <button class="full-width btn btn-primary submit" type="submit">Log in</button>
        			        </div>

        			        <div class="clearfix"></div>

        			        <div class="separator">
                        		<p class="change_link">Does'n have accpont ?
                          			<a href="#signup" class="to_register"> Create Account </a>
                        		</p>
                        	</div>
                        </form>
              		</section>
          		</div>

              @include('ebtke.sipeda.pages.auth.registration')
        	</div>
    	</div>
    	<div id="custom_notifications" class="custom-notifications dsp_none">
        	<ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
        	</ul>
        	<div class="clearfix"></div>
        	<div id="notif-group" class="tabbed_notifications"></div>
    	</div>
      @include('ebtke.slots.vars')
    	@include('ebtke.sipeda.partials.js_footer')
    	<script src="{{ asset('themes/ebtke/sipeda/pages/auth/registration.js') }}"></script>
	</body>
</html>