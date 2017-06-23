@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $investment_services['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $investment_services['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $investment_services['meta_description'] or '' }}" />
@stop

@section('content')



<!-- 
    ____ ___  _   _ _____ _____ _   _ _____ 
   / ___/ _ \| \ | |_   _| ____| \ | |_   _|
  | |  | | | |  \| | | | |  _| |  \| | | |  
  | |__| |_| | |\  | | | | |___| |\  | | |  
   \____\___/|_| \_| |_| |_____|_| \_| |_|  
                                            
-->

@if(isset($investment_services) && !empty($investment_services))
<section id="desktop">
    <!-- Begin page header-->
    <div class="container detail--header default-large-banner-section">
        <div class="row">
            <div id="desktop-breadcrumb-menu" class="col-md-12">
                <a href="{{ route('MainPage') }}" class="breadcrumb text-gray">
                    {{ trans('navigation/menu.menu_home')}}
                </a>
                <a href="{{ route('InvestmentServicesLanding') }}" class="breadcrumb text-gray">
                    {{ trans('navigation/menu.menu_investment_services')}}
                </a>
            </div>
            <div class="col-md-12">
                <h3 class="latestnews__title text-center">{{ $investment_services['title'] or '' }}</h3>
                
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
                    <img class="mySlides" src="{{ $investment_services['thumbnail_url'] or '' }}" style="width:100%">

                    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                    <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                </div>
            </div>

            
        </div>
    </div>
    <div class="container style--texteditor">

        <div class="default-content">
            {!! $investment_services['introduction'] or '' !!}
            {!! $investment_services['description'] or '' !!}
        </h3>
        </div>
    </div>
</section>
@endif

<!-- 
      _    _     ____   ___    _     ___ _  _______ 
     / \  | |   / ___| / _ \  | |   |_ _| |/ / ____|
    / _ \ | |   \___ \| | | | | |    | || ' /|  _|  
   / ___ \| |___ ___) | |_| | | |___ | || . \| |___ 
  /_/   \_\_____|____/ \___/  |_____|___|_|\_\_____|
                                                    
-->

@if(isset($investment_services['related']) && !empty($investment_services['related']))
<section id="desktop">
    <!-- Begin page header-->
    <div class="container">
        <hr/>
        <div class="detail-also-like-title">
            <h1>You might also like</h1>
        </div>
        @foreach($investment_services['related'] as $key=> $related)
        
        <div id="related__news" class="col-md-4">
            <img src="{{ $related['related_thumbnail_url'] }}" class="img-responsive">
            <p>
                <a href="{{ route('InvestmentServicesDetail',$related['related_slug']) }}">
                    <h4>{{ $related['related_title'] }}</h4>
                </a>
            </p>
            @if(isset($related['related_day_ago']) && !empty($related['related_day_ago']))
            <ul>
                <li>{{ $related['related_day_ago'] }}</li>
                <li>{{ $related['related_view'] }} Views</li>
            </ul>
            @endif
        </div>
        @endforeach
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