<div class="font-white" id="top">
    <div class="container">
    	<div class="pull-left">
    		<div id="top-navigation" class="secondmenu_left">
    			<ul class="add_fix">
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_home') }}</a>
    				</li>
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_site_map') }}</a>
    				</li>
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_link') }}</a>
    				</li>
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_stock') }}</a>
    				</li>
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_career') }}</a>
    				</li>
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_web_mail') }}</a>
    				</li>
    				<li>
    					<a href="#">{{ trans('navigation/top_menu.menu_faq') }}</a>
    				</li>
    			</ul>
    		</div>
    	</div>
        <div class="btn-group pull-right">
        	@if(Request::segment(1) == "id")
            <button type="button" class="btn btn-default btn-xs">Bahasa</button>
            @else
            <button type="button" class="btn btn-default btn-xs">Language</button>
            @endif
            <button type="button" class="btn btn-default dropdown-toggle btn-xs" data-toggle="dropdown" aria-expanded="true">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
            </button>
	        <ul class="dropdown-menu" role="menu">
	        	@foreach(LaravelLocalization::getSupportedLocales() as $localeCode => $properties)
	            	<li>
			            <a style="color: #2d2d2d" rel="alternate" hreflang="{{$localeCode}}" href="{{LaravelLocalization::getLocalizedURL($localeCode) }}">
			                {{ $properties['native'] }}
			            </a>
			        </li>
			    @endforeach
	        </ul>
        </div>
    </div>
</div>