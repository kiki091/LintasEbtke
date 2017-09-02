@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail['meta_title'] or '' }} | Kementerian ESDM Republik Indonesia
@stop

@section('detail')
    <meta name="keywords" content="{{ $detail['meta_keyword'] or '' }} | Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $detail['meta_description'] or '' }} | Kementerian ESDM Republik Indonesia" />
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
	
	@if(isset($main_banner) && !empty($main_banner))
	<div class="default-banner-section visible-md visible-lg">
        <div class="default-banner-image">
            @foreach($main_banner as $key=> $val)
            <div class="image-container image-loaded-version">
                <img src="{{ $val['image_url'] }}">
            </div>
            @endforeach
        </div>
        
    </div>
    @endif

    @if(isset($detail) && !empty($detail))
    <div class="container detail--header default-large-banner-section">
    	<div class="row">
    		<!--
		       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
		      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
		       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
		       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
		      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

		    -->

    		<div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="default-after-banner-text">
                    <h1>
                        {{ $detail['office_name'] or '' }}
                    </h1>
                    <!-- <h3>
                        CONNECT WITH GREEN PROFILES
                    </h3> -->
                </div>
            </div>
            @if(isset($detail['slider_images']) && !empty($detail['slider_images']))
            <div class="col-md-12">
                <div class="w3-content w3-display-container">
                    @foreach($detail['slider_images'] as $key=> $slider_images)
                    <img class="mySlides" src="{{ $slider_images['filename_url'] or '' }}" style="width:100%">
                    @endforeach
                    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                    <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                </div>
            </div>
            @endif
        </div>
    </div>
    <div class="container style--texteditor">

        <div class="default-content">
            {!! $detail['description'] or '' !!}
            {!! $detail['address'] or '' !!}
        </div>
    </div>

    @endif
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