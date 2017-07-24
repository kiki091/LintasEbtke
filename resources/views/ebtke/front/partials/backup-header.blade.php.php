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
            
            <form class="navbar-form" role="search">

                <div class="col-md-12 pull-right">
                <p id="desktop__content" class="paragraph__date">
                    {{ EbtkeHelper::getDayNow() }}
                </p>

                <p id="desktop__content" class="paragraph__language">
                    <a rel="alternate" href="{{LaravelLocalization::getLocalizedURL('id') }}">
                        Bahasa Indonesia || 
                    </a>
                    <a rel="alternate" href="{{LaravelLocalization::getLocalizedURL('en') }}">
                        English
                    </a>

                </p>
                </div>
                <div class="full__width col-md-12 pull-right no__padding__right">
                        <!-- <div id="mobile__content" class="input-group">
                            <input type="text" class="form-control" placeholder="Search">
                            <span class="input-group-btn">
                                <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                            </span>
                        </div> -->

                        <div class="search-top clearfix  pull-right">
                            <div class="col-md-10 col-lg-10 col-xs-10 offset-0">
                                <input name="_search" type="text" placeholder="Pencarian" class="_search">
                            </div>
                            <div class="col-md-2 col-lg-2 col-xs-2 offset-0">
                                <button class="fa fa-search pull-right"></button>
                            </div>
                        </div>

                </div>
                <div class="col-md-12 pull-right">
                <p id="desktop__content" class="paragraph__navigation" style="margin-top: 5px">
                    <a href="{{ route('login') }}">
                        {{ trans('navigation/top_menu.menu_login') }}
                    </a> || 
                    <a href="{{ route('login') }}#signup">
                    {{ trans('navigation/top_menu.menu_register') }}
                    </a>
                </p>
                </div>
            </form>

        </div>
    </div>
    <!-- DESKTOP NAVIGATION MENU -->
    @include('ebtke.front.partials.desktop-navigation')
    <!-- MOBILE NAVIGATION MENU -->
        <!-- /.container -->
</div>
    <!-- /#navbar -->
    <!-- *** NAVBAR END *** -->

