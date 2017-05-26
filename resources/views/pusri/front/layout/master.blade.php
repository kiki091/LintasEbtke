<!DOCTYPE html>
<html lang="en-GB" class="csstransforms csstransforms3d csstransitions skrollr skrollr-desktop">
	<head>
		@include('pusri.front.partials.header')
	</head>

	<body>
		<!-- PRELOADER -->
		<img id="preloader" src="{{ asset('themes/pusri/front/images/preloader.gif') }}" alt="Loading Page" title="Loading Page" />

		<!-- //PRELOADER -->
		<div class="preloader_hide" style="min-height: 1000px;">

			<!-- PAGE -->
			@include('pusri.front.partials.top-menu-dinamis')
			@include('pusri.front.partials.menu-dinamis')
			
			@yield('content')

			@include('pusri.front.partials.footer')
		</div>
		@include('pusri.front.partials.js_footer')
			
	</body>
</html>


