<div id="mobile__content">
    <div id="top">
        <div class="container">
            <div class="btn-group pull-right">
            	@if(Request::segment(1) == "id")
                <button type="button" class="btn btn-default btn-xs">
                    @include('ebtke.front.svg-icon.ico-flag-indonesia')
                    Indonesia
                </button>
                @else
                <button type="button" class="btn btn-default btn-xs">
                    @include('ebtke.front.svg-icon.ico-flag-english')
                    English
                </button>
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
</div>