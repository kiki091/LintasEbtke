<div class="col-md-3 left_col menu_fixed">
	<div class="left_col scroll-view">
    	<div class="navbar nav_title">
      <center>
          <img style="opacity: 0.5;" src="{{ asset('themes/ebtke/front/images/loader.png') }}" class="img-responsive">
      </center>
          <a href="#" class="site_title"><span>LINTAS EBTKE</span></a>
    	</div>

    	<div class="clearfix"></div>
    	<br />

    	<!-- sidebar menu -->
    	<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
      		<div class="menu_section">
            <?php 
              $userInfo = DataHelper::userInfo();
            ?>

            @if($userInfo['user_location']['name'] == 'admin')
            <h3>Account</h3>
            <ul class="nav side-menu">
                <li>
                    <a>
                        <i class="fa fa-navicon"></i>
                        Navigation <span class="fa fa-chevron-down"></span>
                    </a>

                    <ul class="nav child_menu">
                        <li>
                            <a href="#menu-group" onclick="menuGroup()">
                                Menu Group
                            </a>
                        </li>
                        <li>
                            <a href="#menu-navigation" onclick="menuNavigation()">
                                Menu Navigation
                            </a>
                        </li>
                        <li>
                            <a href="#sub-menu-navigation" onclick="menuSubNavigation()">
                                Sub Navigation
                            </a>
                        </li>
                    </ul>
                </li> 

                <li>
                    <a>
                        <i class="fa fa-shield"></i>
                        User Management <span class="fa fa-chevron-down"></span>
                    </a>

                    <ul class="nav child_menu">
                        <li>
                            <a href="#menu-privilage" onclick="menuUserAccount()">
                                User Account
                            </a>
                        </li>
                    </ul>
                </li> 
            </ul>
            @endif

            
        		<h3>General</h3>

        		<ul class="nav side-menu">
                
            @foreach(DataHelper::userMenu() as $key=> $user_menu)
                @foreach($user_menu as $key_icon=> $menu)
          			<li>
          				<a>
          					<i class="fa {{ $key_icon }}"></i> 
          					{{ $key }} <span class="fa fa-chevron-down"></span>
          				</a>
            			<ul class="nav child_menu">
                      @foreach($menu as $key_menu=> $menu_navigation)
                          @if($menu_navigation['have_sub_menu'] == '0')
                  				<li>
                  					<a href="#{{ $menu_navigation['slug'] }}" onclick="{{ $menu_navigation['url'] }}">
                                {{ $menu_navigation['title'] }}     
                            </a>
                  				</li>
                          @else
                          <li>
                              <a href="#{{ $menu_navigation['slug'] }}">
                                {{ $menu_navigation['title'] }}
                                <span class="fa fa-chevron-down"></span>
                              </a>
                              <ul class="nav child_menu">
                                  @foreach($menu_navigation['sub_menu'] as $key=> $sub_menu)
                                  <li class="sub_menu">
                                      <a href="#{{ $sub_menu['slugh_sub_menu'] }}" onclick="{{ $sub_menu['url_sub_menu'] }}">
                                        {{ $sub_menu['title_sub_menu'] }}
                                      </a>
                                  </li>
                                  @endforeach
                              </ul>
                          </li>
                          @endif
                      @endforeach
            			</ul>
          			</li>
                @endforeach
            @endforeach
        		</ul>

      		</div>

    	</div>
    	<!-- /sidebar menu -->
  	</div>
</div>