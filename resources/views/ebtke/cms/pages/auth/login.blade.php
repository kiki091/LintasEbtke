<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="author" content="PT. Asia Resource System">
		<meta name="author" content="Kementerian ESDM Republik Indonesia" />
		<meta name="publisher" content="www.ebtke.esdm.go.id" />
		<meta name="copyright" content="www.ebtke.esdm.go.id" />
		<meta name="host" content="www.ebtke.esdm.go.id" />
		<meta name="geo.position" content="-6.196985,106.84060099999999" />    
		<meta name="geo.region" content="ID-JB" />
		<meta name="geo.country" content="ID"/>
		<meta name="geo.placename" content="Jakarta, Indonesia" />
		<meta name="ICBM" content="0.18597,117.47865" />    
		<meta name="DC.title" content="Kementerian ESDM Republik Indonesia" />

		<meta Http-Equiv="Cache-Control" Content="no-cache">
		<meta Http-Equiv="Pragma" Content="no-cache">
		<meta Http-Equiv="Expires" Content="0">
		<!-- OG CONTENT -->
		<meta property="og:url" content="http://www.ebtke.esdm.go.id/" />
		<meta property="og:title" content="Kementerian ESDM Republik Indonesia" />
		<meta property="og:description" content="Kementerian ESDM Republik Indonesia" />
		<meta property="og:image" content="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.png') }}" />
		<meta property="og:type"  content="article" />
		<title>Login Page</title>

		<!-- Bootstrap -->
		<link href="{{ asset('themes/ebtke/cms/vendors/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
		<link href="{{ asset('themes/ebtke/cms/css/custom.css') }}" rel="stylesheet">
		<!-- Font Awesome -->
		<link href="{{ asset('themes/ebtke/cms/vendors/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">

		<!-- Custom Theme Style -->
		<link href="{{ asset('themes/ebtke/cms/build/css/custom.min.css') }}" rel="stylesheet">
	</head>
	<body>

		<div class="login__background">
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
            				<div class="form-group">
              					<input type="email" class="form-control" placeholder="Email" value="{{ old('email') }}" name="email" required="required" />
            				</div>
            				
            				<div class="form-group">
              					<input type="password" class="form-control" placeholder="Password" name="password" required="required" />
            				</div>
                          	<input type="hidden" name="_token" value="{{ csrf_token() }}">
                          	<button class="btn__submit__login">Submit</button>
                        	<p><a href="{{ route('register') }}">Registration</a></p>
                  		</form>
          			</section>
        		</div>
        	</div>
      	</div>

	</body>
</html>