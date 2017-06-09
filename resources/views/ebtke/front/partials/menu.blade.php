<div class="navbar navbar-default yamm" role="navigation" id="navbar">
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
            <div class="navbar-buttons pull-left">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="fa fa-align-justify"></i>
                </button>
            </div>
            <form class="navbar-form" role="search">
                <p id="desktop__content" class="paragraph__date">
                    {{ EbtkeHelper::getDayNow() }}
                </p>

                <p id="desktop__content" class="paragraph__language">
                    <span class="title__language__selector">
                        {{ trans('navigation/menu.language_selector')}}
                    </span>
                    <a rel="alternate" href="{{LaravelLocalization::getLocalizedURL('en') }}">
                        @include('ebtke.front.svg-icon.ico-flag-english')
                    </a>
                    <a rel="alternate" href="{{LaravelLocalization::getLocalizedURL('da') }}">
                        @include('ebtke.front.svg-icon.ico-flag-denmark')
                    </a>
                    <a rel="alternate" href="{{LaravelLocalization::getLocalizedURL('id') }}">
                        @include('ebtke.front.svg-icon.ico-flag-indonesia')
                    </a>

                </p>
                
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search">
                    <span class="input-group-btn">

                         <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>

                      </span>
                </div>
                <p id="desktop__content" class="paragraph__navigation" style="margin-top: 5px">
                    <a href="{{ route('login') }}">
                        {{ trans('navigation/top_menu.menu_login') }}
                    </a> || 
                    <a href="{{ route('login') }}#signup">
                    {{ trans('navigation/top_menu.menu_register') }}
                    </a>
                </p>
            </form>

        </div>
    </div>
    <!-- DESKTOP NAVIGATION MENU -->
    @include('ebtke.front.partials.desktop-navigation')
    <!-- MOBILE NAVIGATION MENU -->
    @include('ebtke.front.partials.mobile-navigation')
        <!-- /.container -->
</div>
    <!-- /#navbar -->
    <!-- *** NAVBAR END *** -->

