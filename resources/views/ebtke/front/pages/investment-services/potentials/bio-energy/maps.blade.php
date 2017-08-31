@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }} | Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }} | Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }} | Kementerian ESDM Republik Indonesia" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

<section id="desktop" class="page" style="min-height: 500px;">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
        		<div class="col-md-12">
                  <h3 class="latestnews__title text-center">
                      {{ trans('pages/investment_services_page.potentials.bio_energy')}}
                  </h3>

                  <h3 class="text-center">
                      <a href="http://geoportal.esdm.go.id/peng_umum/" class="map-cta text-center" target="_blank">
                        <span>{{ trans('global_page.view_map') }}</span>
                      </a>
                      
                  </h3>
      			      <!-- <div class="wrapper">
                      <center><div id="map"></div></center>
      	          </div> -->
                  <div class="w3-content w3-display-container">
                    <a href="http://geoportal.esdm.go.id/peng_umum/" target="_blank">
                      <img class="mySlides" src="{{ asset(BIO_ENERGI_IMAGES_DIRECTORY.'peta.PNG') }}" style="width:100%">
                    </a>
                  </div>
        	  </div>
        </div>
    </div>
</section>

@endsection

@section('scripts')
<script>
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
      showDivs(slideIndex += n);
    }

    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = x.length}
      for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";  
      }
      x[slideIndex-1].style.display = "block";  
    }
</script>
@stop