<!DOCTYPE html>
<html lang="en">
  	<head>
  	
      @include('ebtke.cms.partials.head')
  	</head>

  	<body class="nav-md fixed">
      @include('ebtke.cms.partials.notify')
  		<div class="container body">
      		<div class="main_container">
        			@include('ebtke.cms.partials.sidebar')
        			@include('ebtke.cms.partials.top-bar')
              <div class="main__wrapper__content">
                  <div class="right_col" role="main">
      				      @yield('content')
                  </div>
              </div>
  			   </div>
  		</div>
      <div id="custom_notifications" class="custom-notifications dsp_none">
          <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
          </ul>
          <div class="clearfix"></div>
          <div id="notif-group" class="tabbed_notifications"></div>
      </div>
      @include('ebtke.cms.partials.vars')
  		@include('ebtke.cms.partials.js_component')
		  @section('scripts')
      @show
  	</body>
</html>