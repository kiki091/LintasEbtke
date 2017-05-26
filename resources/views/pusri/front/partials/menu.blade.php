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

                <ul class="nav navbar-nav navbar-center">
                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">
                        {{ trans('navigation/menu.menu_company')}}
                        <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_profile') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="{{ route('CompanyProfile',trans('navigation/slug_menu.slug_menu_company').'/'.trans('navigation/slug_sub_menu.slug_company.slug_company_profile')) }}">
                                                        {{ trans('navigation/sub_menu.company.company_profile') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('CompanyProfile',trans('navigation/slug_menu.slug_menu_company').'/'.trans('navigation/slug_sub_menu.slug_company.slug_company_value')) }}">
                                                        {{ trans('navigation/sub_menu.company.company_value') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="{{ route('CompanyProfile',trans('navigation/slug_menu.slug_menu_company').'/'.trans('navigation/slug_sub_menu.slug_company.slug_corporate_identity')) }}">{{ trans('navigation/sub_menu.company.corporate_identity') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.management') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.procurement') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_history') }}</h5>
                                            <ul>

                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.company_vision_mision') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.logo_meaning') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.our_journey') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.certification') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.company.subsidiary_company') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_product')}}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_product') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.product.urea') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.product.npk_fusion') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.product.ammonia') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.product.research') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_distribution')}}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_distribution') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.distribution_&_marketing.distribution') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.distribution_&_marketing.distributor') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.distribution_&_marketing.marketing') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.distribution_&_marketing.retailer') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_report')}}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_report') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.report.production') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.report.finance') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.report.sale') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.report.annual_report') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_gcg')}}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_gcg') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.good_corporate_governance_overview') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.code_of_conduct') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.integrity_pack') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.internal_control_system') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.komitmen_anti_gratifikasi') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-sm-4">
                                            <h5 style="visibility: hidden;">{{ trans('navigation/sub_menu.lable_company_gcg') }}</h5>
                                            <ul>

                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.code_of_corporate_governance') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.board_of_commisioners_&_directors_manual') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.whistle_blowing_system') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.gcg.risk_management') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>

                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_csr') }}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                        <h5>{{ trans('navigation/sub_menu.lable_company_csr') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.csr.csr_progrram') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.csr.gallery_csr') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.csr.csr_news') }}  
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_news_&_event') }}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_news_&_event') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.news_&_event.latest_news') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.news_&_event.mass_media') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">{{ trans('navigation/menu.menu_contact_us') }}<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">

                                        </div>
                                        <div class="col-sm-4">
                                            <h5>{{ trans('navigation/sub_menu.lable_company_contact_us') }}</h5>
                                            <ul>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.contact_us.company_address') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.contact_us.representative_office') }}
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">{{ trans('navigation/sub_menu.contact_us.inquiry_form') }} 
                                                        <i class="fa fa-angle-right pull-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
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

