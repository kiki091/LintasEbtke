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
            <div id="desktop__content">
                <a href="{{ route('MainPage') }}" class="breadcrumb text-gray">
                    {{ trans('navigation/menu.menu_home')}}         
                </a>
                <a href="{{ route('InvestmentServicesPotentialsEnergyConservation') }}" class="breadcrumb text-gray">
                    {{ trans('navigation/sub_menu.energy_conservation')}}
                </a>
                <a href="{{ route('InvestmentServicesPotentialsEnergyConservationDetail',$detail['slug']) }}" class="breadcrumb text-gray">{{ $detail['title'] or '' }}</a>
            </div>
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
                    <img class="mySlides" src="{{ $detail['thumbnail_url'] or '' }}" style="width:100%">
                </div>
            </div>
            
        </div>
    </div>
    <div class="col-md-12">
        <div class="row">
            <div class="container">
                <div class="col-md-3 container">

                    <div class="page-default-details-intro">
                        <h4>{!! $detail['introduction'] or '' !!}</h4>
                    
                    </div>
                </div>
                <div class="col-md-7 container style--texteditor">

                    <div id="detail-content-container">
                        {!! $detail['description'] or '' !!}
                    </div>
                </div>
                <div id="desktop__content" class="col-md-2 container style--texteditor">

                    <div id="desktop-map-button" class="center-version">
                        <h3>Energy Conservation</h3>
                        
                        <div class="map-icon">
                            @include('ebtke.front.svg-icon.maps')
                        </div>
                    </div>
                    <a href="#" class="planner-cta">
                        <h4>Show data energy conservation</h4>
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