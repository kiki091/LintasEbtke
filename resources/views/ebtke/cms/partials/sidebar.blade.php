<div class="col-md-3 left_col menu_fixed">
	<div class="left_col scroll-view">
    	<div class="navbar nav_title">
      <center>
          <img style="opacity: 0.5;margin-top: 5%;width: 35%;" src="{{ asset('themes/ebtke/front/images/loader.png') }}" class="img-responsive">
      </center>
          <a href="#" class="site_title"><span>LINTAS EBTKE</span></a>
    	</div>
    	<div class="clearfix"></div>
    	<br />

    	<!-- sidebar menu -->
    	<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
      		<div class="menu_section">
        		<h3>General</h3>
        		<ul class="nav side-menu">
            @foreach(DataHelper::userMenu() as $key=> $user_menu)
                
                @foreach($user_menu as $key_icon=> $menu)
                @foreach($menu as $key_slug=> $menu)
                @if($key_slug == Request::segment(1))
          			<li>
          				<a>
          					<i class="fa {{ $key_icon }}"></i> 
          					{{ $key }} <span class="fa fa-chevron-down"></span>
          				</a>
            			<ul class="nav child_menu">
                      @foreach($menu as $key_menu=> $menu_navigation)
                          @if($menu_navigation['is_active'] == '1')
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
                                          @if($sub_menu['is_active'] == '1')
                                              <li class="sub_menu">
                                                  <a href="#{{ $sub_menu['slugh_sub_menu'] }}" onclick="{{ $sub_menu['url_sub_menu'] }}">
                                                    {{ $sub_menu['title_sub_menu'] }}
                                                  </a>
                                              </li>
                                          @endif
                                      @endforeach
                                  </ul>
                              </li>
                              @endif
                          @endif
                      @endforeach
            			</ul>
          			</li>
                @endif
                @endforeach
                @endforeach
            @endforeach
        		</ul>

      		</div>

    	</div>
    	<!-- /sidebar menu -->
  	</div>
</div>