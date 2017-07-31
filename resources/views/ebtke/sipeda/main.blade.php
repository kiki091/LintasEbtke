<link rel="stylesheet" type="text/css" href="{{ asset('themes/ebtke/front/build/css/plugins.css') }}">
<div id="desktop_content">
    <div id="top">
        <div class="container">
            <div id="desktop_content">
                <div id="top-navigation" class="secondmenu_left">
                    <ul class="add_fix">
                        <li>
                            <a style="font-size: 14px;" href="{{ route('sipeda_login') }}">{{ trans('navigation/top_menu.menu_login') }}</a>
                        </li>
                        <li>
                            <a style="font-size: 14px;" href="{{ route('sipeda_login') }}#signup">{{ trans('navigation/top_menu.menu_register') }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<section class="page">
	<h2 style="text-align: center;">SIPEDA</h2>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<canvas id="mybarChart"></canvas>
			</div>
		</div>
	</div>
</section>
<script src="{{ asset('themes/ebtke/cms/js/jquery.min.js') }}"></script>
<!-- Bootstrap -->
<script src="{{ asset('themes/ebtke/cms/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/bower_components/Chart.js/dist/Chart.min.js') }}"></script>

<!-- Custom Theme Scripts -->
<script src="{{ asset('themes/ebtke/cms/js/custom.min.js') }}"></script>