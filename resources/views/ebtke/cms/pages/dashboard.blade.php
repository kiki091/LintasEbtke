@extends('ebtke.cms.layout.main')
@section('content')

    <!-- page content -->
    <div class="bg__gray">
		<div class="page-title">
			<div class="title_left">
		        <h3>DASHBOARD </h3>
		        <p>CONTENT MANAGEMENT SYSTEM</p>
		    </div>
		</div>
	</div>
    <!-- /page content -->

	<!-- <script src="{{ asset('themes/ebtke/cms/js/socket.io-1.3.5.js') }}"></script>
	<script>
	  	var socket = io('http://127.0.0.1:9090');
	  
	  	socket.on('message', function (msg) {

	    	pushNotif(true, msg.name + '('+ msg.email +') baru saja mendaftar')
	  	});
	</script> -->
	
@endsection