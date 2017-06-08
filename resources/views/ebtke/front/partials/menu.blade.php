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
                <p id="desktop__content">{{ EbtkeHelper::getDayNow() }}</p>
                
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search">
                    <span class="input-group-btn">

                         <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>

                      </span>
                </div>
                <b id="desktop__content" style="margin-top: 5px">
                    <a style="color: #2d2d2d" href="{{ route('login') }}">
                        {{ trans('navigation/top_menu.menu_login') }}
                    </a> || 
                    <a style="color: #2d2d2d" href="{{ route('login') }}#signup">
                    {{ trans('navigation/top_menu.menu_register') }}
                    </a>
                </b>
            </form>

        </div>
    </div>
    <div id="navigation-menu">
        <div class="container-menu-navigation">
            <!-- MENU HEADER -->
            <div class="navbar-collapse collapse" id="navigation">

                <ul class="nav navbar-nav navbar-center">
                    <li>
                        <a href="{{ route('MainPage') }}" data-delay="200">
                        {{ trans('navigation/menu.menu_home')}}
                        </a>
                    </li>
                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_about_us')}}
                        <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="{{ route('CompanyHistory') }}">
                                                            {{ trans('navigation/sub_menu.lintas_history') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="{{ route('CompanyVisionMission') }}">
                                                            {{ trans('navigation/sub_menu.vision_mission') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="{{ route('CompanyOrganization') }}">
                                                            {{ trans('navigation/sub_menu.organization_structure') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="{{ route('CompanyScope') }}">
                                                            {{ trans('navigation/sub_menu.lintas_scope') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_news_and_event')}}
                        <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="{{ route('landingNews') }}">
                                                            {{ trans('navigation/sub_menu.news') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="{{ route('landingEvent') }}">
                                                            {{ trans('navigation/sub_menu.events') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_investment_services')}}
                        <b class="caret"></b></a>

                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.procedure') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.potentials') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.green_pages') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_information_services')}}
                        <b class="caret"></b></a>

                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.gheotermal') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.bio_energy') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.others') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_renewable_energi')}}
                        <b class="caret"></b></a>
                        
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.industry') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.commercial_building') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.transportation') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.residentials') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_resource')}}
                        <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.tools') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.white_papers') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.publications') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.featibility_studies') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_link')}}
                        <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="container">
                                            <div class="col-sm-4">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.nreec_institutions') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.nreec_resources') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            {{ trans('navigation/sub_menu.nreec_events') }}
                                                            <i class="fa fa-angle-right pull-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>

                </ul>

            </div>
            <!--/.nav-collapse -->
            
            <!--/.nav-collapse -->
        </div>
    </div>
        <!-- /.container -->
</div>
    <!-- /#navbar -->
    <!-- *** NAVBAR END *** -->

