<!DOCTYPE html>
<html lang="en">
	@section('pageheadtitle')
		SIPEDA LOGIN PAGES
	@endsection
	@include('ebtke.sipeda.partials.header')
	<body class="login">

		  <div>
          <div class="login_wrapper">
              <div id="login" class="animate form login_form">
                  <section class="login_content">
                      <h1>SELAMAT ACCOUNT ANDA TELAH TEREGISTRASI</h1>
                      <p>SILAHKAN TUNGGU KONFIRMASI DARI ADMIN DALAM 5X24 JAM</p>
                  </section>
              </div>
          </div>
    	</div>
    	<div id="custom_notifications" class="custom-notifications dsp_none">
        	<ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
        	</ul>
        	<div class="clearfix"></div>
        	<div id="notif-group" class="tabbed_notifications"></div>
    	</div>
      @include('ebtke.slots.vars')
    	@include('ebtke.sipeda.partials.js_footer')
    	<script src="{{ asset('themes/ebtke/sipeda/pages/auth/registration.js') }}"></script>
	</body>
</html>