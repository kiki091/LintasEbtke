<div id="header__content"  class="navbar navbar-default yamm" role="navigation" id="navbar">
    <div class="container-menu">
        <div class="navbar-header">

            <a id="navbar-brand__mobile" class="navbar-brand home" href="{{ route('MainPage') }}">
                <!-- DESKTOP LOGO -->
                <img src="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.png') }}" alt="Kementerian ESDM Republik Indonesia" class="hidden-xs" id="logo-header" title="Kementerian ESDM Republik Indonesia">
                <!-- MOBILE LOGO -->
                <img id="logo__header__mobile" src="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.png') }}" alt="Kementerian ESDM Republik Indonesia" title="Kementerian ESDM Republik Indonesia" class="visible-xs">
            </a>
        </div>
        <!--/.navbar-header -->
        <div id="search">
            
            <form class="navbar-form  pull-left col-md-8" role="search">
                <div class="search-top clearfix">
                    <div class="col-md-10 col-lg-10 col-xs-10 offset-0">
                        <input name="_search" type="text" placeholder="Pencarian" class="_search">
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-2 offset-0">
                        <button class="fa fa-search pull-right"></button>
                    </div>
                </div>
            </form>
            <div class="paragraph__navigation">

                <a href="{{ route('login') }}">
                    {{ trans('navigation/top_menu.menu_login') }} || 
                </a> 
                <a href="{{ route('login') }}#signup">
                    {{ trans('navigation/top_menu.menu_register') }}
                </a>
                <div class="btn-group paragraph__language">
                    @if(Request::segment(1) == "id")
                    <button type="button" class="btn btn-default btn-xs">
                        @include('ebtke.front.svg-icon.ico-flag-indonesia')
                    </button>
                    @else
                    <button type="button" class="btn btn-default btn-xs">
                        @include('ebtke.front.svg-icon.ico-flag-english')
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
    <!-- DESKTOP NAVIGATION MENU -->
    @include('ebtke.front.partials.desktop-navigation')
    <!-- MOBILE NAVIGATION MENU -->
        <!-- /.container -->
</div>
    <!-- /#navbar -->
    <!-- *** NAVBAR END *** -->

