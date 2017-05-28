<div class="navbar navbar-default yamm" role="navigation" id="navbar">
    <div class="container">
        <div class="navbar-header">

            <a class="navbar-brand home" href="{{ route('MainPage') }}">
                <img src="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.png') }}" alt="Kementerian ESDM Republik Indonesia" class="hidden-xs" title="Kementerian ESDM Republik Indonesia" style="height: 100%">
                
                <img src="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.png') }}" alt="Kementerian ESDM Republik Indonesia" title="Kementerian ESDM Republik Indonesia" class="visible-xs" style="height: 100%;">
            </a>
            <div class="navbar-buttons">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="fa fa-align-justify"></i>
                </button>
            </div>
        </div>
        <!--/.navbar-header -->
        <div id="search">

            <form class="navbar-form" role="search">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search">
                    <span class="input-group-btn">

                         <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>

                      </span>
                </div>
            </form>
        </div>
        <hr style="clear: both;" />
    </div>
    <div id="navigation-menu">
        <div class="container-menu">
            <!-- MENU HEADER -->
            <div class="navbar-collapse collapse" id="navigation">

                <ul class="nav navbar-nav navbar-center">
                    <li>
                        <a href="#" data-delay="200">
                        {{ trans('navigation/menu.menu_about_us')}}
                        </a>
                        
                    </li>

                    <li>
                        <a href="#" data-delay="200">{{ trans('navigation/menu.menu_news_and_event')}}
                        </a>
                    </li>

                    <li>
                        <a href="#" data-delay="200">{{ trans('navigation/menu.menu_investment_services')}}
                        </a>
                    </li>

                    <li>
                        <a href="#" data-delay="200">{{ trans('navigation/menu.menu_renewable_energi')}}
                        </a>
                    </li>

                    <li>
                        <a href="#" data-delay="200">{{ trans('navigation/menu.menu_energi_conservation')}}
                        </a>
                    </li>

                    <li>
                        <a href="#" data-delay="200">{{ trans('navigation/menu.menu_resource')}}
                        </a>
                    </li>

                    <li>
                        <a href="#" data-delay="200">{{ trans('navigation/menu.menu_link')}}
                        </a>
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

