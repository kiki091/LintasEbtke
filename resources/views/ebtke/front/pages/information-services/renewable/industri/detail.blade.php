@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail_industri['meta_title'] or '' }} Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $detail_industri['meta_keyword'] or '' }} Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $detail_industri['meta_description'] or '' }} Kementerian ESDM Republik Indonesia" />
@stop

@section('content')



<!-- 
    ____ ___  _   _ _____ _____ _   _ _____ 
   / ___/ _ \| \ | |_   _| ____| \ | |_   _|
  | |  | | | |  \| | | | |  _| |  \| | | |  
  | |__| |_| | |\  | | | | |___| |\  | | |  
   \____\___/|_| \_| |_| |_____|_| \_| |_|  
                                            
-->

@if(isset($detail_industri) && !empty($detail_industri))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container detail--header default-large-banner-section">
    	<div class="row">
            <div id="desktop__content">
        		    <div id="desktop-breadcrumb-menu" class="col-md-12">
        			      <a href="#" class="breadcrumb text-gray">
                      {{ trans('navigation/menu.menu_information_services')}}   
                    </a>
                    <a href="#" class="breadcrumb text-gray">
                      {{ trans('navigation/sub_menu.renewable_energi')}}
                    </a>
                    <a href="#" class="breadcrumb text-gray">{{ trans('navigation/sub_menu.industry')}}</a>
        		    </div>
            </div>
            <div class="col-md-12">
                  <h3 class="latestnews__title text-center">
                      {{ $detail_industri['title'] or '' }}
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
                    <img class="mySlides" src="{{ $detail_industri['thumbnail_url'] or '' }}" style="width:100%">

                    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                    <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                </div>
            </div>

            
    	</div>
    </div>
    <div class="container style--texteditor">

        <div class="default-content">
            {!! $detail_industri['introduction'] or '' !!}
            {!! $detail_industri['description'] or '' !!}
        
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