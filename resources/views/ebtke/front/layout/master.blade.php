<!DOCTYPE html>
<html lang="en-GB" class="csstransforms csstransforms3d csstransitions skrollr skrollr-desktop">
	<head>
		@include('ebtke.front.partials.header')
	</head>

	<body>
		<!-- PRELOADER -->
		<img id="preloader" src="{{ asset('themes/ebtke/front/images/preloader.gif') }}" alt="Loading Page" title="Loading Page" />

		<!-- //PRELOADER -->
		<div class="preloader_hide" style="min-height: 1000px;">

			<!-- PAGE -->
			@include('ebtke.front.partials.top-menu')
			@include('ebtke.front.partials.menu')
			
			@yield('content')

			@include('ebtke.front.partials.footer')
		</div>
		@include('ebtke.front.partials.js_footer')
			
	</body>
</html>


