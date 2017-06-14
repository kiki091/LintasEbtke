<!DOCTYPE html>
<html lang="en-GB" class="csstransforms csstransforms3d csstransitions skrollr skrollr-desktop">
	<head>
		@include('ebtke.front.partials.header')
	</head>

	<body>
		<!-- PRELOADER -->
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.9";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>

		@yield('maps-vector')

		<img id="preloader" src="{{ asset('themes/ebtke/front/images/preloader-full.png') }}" alt="Loading Page" title="Loading Page" />

		<!-- //PRELOADER -->
		<div class="preloader_hide" style="min-height: 1000px;">

			<!-- PAGE -->
			@include('ebtke.front.partials.top-menu')
			@include('ebtke.front.partials.menu')
			
			@yield('content')

			@include('ebtke.front.partials.footer')
		</div>
		
		@include('ebtke.front.partials.js_footer')
			
		@section('scripts')

		@stop
	</body>
</html>


