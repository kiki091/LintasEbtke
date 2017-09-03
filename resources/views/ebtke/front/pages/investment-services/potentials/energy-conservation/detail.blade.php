@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $detail['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $detail['meta_description'] or '' }}" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

@if(isset($detail) && !empty($detail))
<section id="desktop" class="page">
	<!-- Begin page header-->
    <div class="container detail--header default-large-banner-section">
        <div class="row">
            
            <div class="col-md-12">
                <h3 class="latestnews__title text-center">
                    {{ $detail['title'] or '' }}
                </h3>
            </div>
            <!--
               ____    _    _   _ _   _ _____ ____
              | __ )  / \  | \ | | \ | | ____|  _ \
              |  _ \ / _ \ |  \| |  \| |  _| | |_) |
              | |_) / ___ \| |\  | |\  | |___|  _ <
              |____/_/   \_\_| \_|_| \_|_____|_| \_\

            -->
            <div class="col-md-12">
                <div class="w3-content w3-display-container">
                  <a href="http://geoportal.esdm.go.id/peng_umum/" target="_blank">
                    <img class="mySlides" src="{{ asset(ENERGY_CONSERVATION_DIRECTORY.'peta.PNG') }}" style="width:100%">
                  </a>
                </div>
            </div>
            
        </div>
    </div>
    <div class="col-md-12">
        <div class="row">
            <div class="container">

                <div class="col-md-3 col-sm-3 col-xs-12 container">

                    <div class="page-default-details-intro">
                        <h4>{!! $detail['introduction'] or '' !!}</h4>
                    
                    </div>
                </div>
                <div class="col-md-7 col-sm-7 col-xs-12 container style--texteditor">

                    <div id="detail-content-container">
                        {!! $detail['description'] or '' !!}
                    </div>
                </div>
                <div id="desktop__content" class="col-md-2 col-sm-2 col-xs-12 container style--texteditor">

                    <div id="desktop-map-button" class="center-version">
                        <h3>Energy Conservation</h3>
                        
                        <div class="map-icon">
                            @include('ebtke.front.svg-icon.maps')
                        </div>
                    </div>
                    <a href="http://geoportal.esdm.go.id/peng_umum/" target="_blank" class="planner-cta">
                        <h4>{{ trans('pages/energy_conservation.show_maps_title') }}</h4>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
@endif
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