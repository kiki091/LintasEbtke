<div class="navbar navbar-default yamm" role="navigation" id="navbar">
    <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand home" href="{{ route('MainPage') }}">
                <img src="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.jpg') }}" alt="PT Pupuk Sriwidjaja Palembang (Pusri)" class="hidden-xs" title="PT Pupuk Sriwidjaja Palembang (Pusri)" style="height: 100%">
                
                <img src="{{ asset(LOGO_IMAGES_DIRECTORY.'logo.jpg') }}" alt="PT Pupuk Sriwidjaja Palembang (Pusri)" title="PT Pupuk Sriwidjaja Palembang (Pusri)" class="visible-xs" style="height: 100%;">
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

            @if(!empty(RouteMenuLocation::getMainMenuNavigation()))
                <ul class="nav navbar-nav navbar-center">
                @foreach(RouteMenuLocation::getMainMenuNavigation() as $key=> $navigation)


                    <li class="{{ $navigation['menu']['class'] }}">
                        <a href="/#{{ $navigation['menu']['menu_trans']['slug'] }}" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ $navigation['menu']['menu_trans']['title'] }}
                        <b class="caret"></b></a>
                        @if(isset($navigation['sub_menu']))
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        @foreach($navigation['sub_menu'] as $key=> $sub_menu)
                                        <div class="col-sm-4">
                                            {{--<h5>{{ trans('navigation/sub_menu.lable_company_profile') }}</h5>--}}
                                            <ul>
                                                @foreach($sub_menu as $value)
                                                <li>
                                                    <a href="{{ route('CompanyProfile', $value['slug']) }}">{{ $value['title'] }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                @endforeach
                                            </ul>
                                        </div>
                                        @endforeach
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                        @endif
                    </li>
                @endforeach
                </ul>
            @endif
            </div>
            <!--/.nav-collapse -->
        </div>
        <!-- /.container -->
    </div>
    <!-- /#navbar -->
</div>
<!-- *** NAVBAR END *** -->
