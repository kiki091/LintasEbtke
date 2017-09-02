@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $history['meta_title'] or '' }} | Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $history['meta_keyword'] or '' }}| Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $history['meta_description'] or '' }}| Kementerian ESDM Republik Indonesia" />
@stop

@section('content')

<!--
    ____    _    _   _ _   _ _____ ____
    | __ )  / \  | \ | | \ | | ____|  _ \
    |  _ \ / _ \ |  \| |  \| |  _| | |_) |
    | |_) / ___ \| |\  | |\  | |___|  _ <
    |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

<section id="desktop">
    @if(isset($main_banner) && !empty($main_banner))
    <div class="col-md-12">
        <div class="row">
        <div style="height: 350px; width: 100%; max-width: 100%;" class="w3-content w3-display-container">
            @foreach($main_banner as $key=> $val)
                <img style="height: 350px; width: 100%" class="mySlides" src="{{ $val['image_url'] }}" style="width:100%">
            @endforeach
            <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
            <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
        </div>
        </div>
    </div>
    @endif

    <!--
       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

    -->
    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="default-after-banner-text">
                    <h1>{{ $history['title'] }}</h1>
                    <h3>
                        {!! $history['introduction'] !!}
                    </h3>
                </div>
            </div>
            
        </div>
    </div>
    <div class="container landing-introduction-section">
        <div class="row">
            <div class="col-md-5">
                <div class="landing-introduction-copy">
                    <div class="default-copy">
                        {!! $history['description_left'] !!}
                        <p id="desktop__content">
                            <a href="{{ $history['file_url'] or '' }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore" target="__blank">
                                {{ trans('global_page.download_pdf') }}
                            </a>
                    </div>
                </div>
            </div>

            <div id="desktop__content" class="col-md-7">
                <div class="landing-introduction-image">

                    <div style="display:none;margin:0 auto;" class="html5gallery" data-skin="gallery" data-width="480" data-height="272" data-resizemode="fill">
                        <!-- Add Youtube video to Gallery -->
                        <a href="https://www.youtube.com/watch?v=q3casuMcn5w">
                            <img src="{{ asset(THUMBNAIL_YOUTUBE_IMAGE_DIRECTORY.'Renewable-Energy-Investment-2016.jpg' ) }}" alt="Global Trends in Renewable Energy Investment 2016">
                        </a>
                        <a href="https://www.youtube.com/watch?v=9X9_7NAW7eI">
                            <img src="{{ asset(THUMBNAIL_YOUTUBE_IMAGE_DIRECTORY.'Top-10-Countries-Using-Maximum-Solar-Power.jpg' ) }}" alt="Top 10 Countries Using Maximum Solar Power">
                        </a>
                        <a href="https://www.youtube.com/watch?v=XSPvZ5_7rVw">
                            <img src="{{ asset(THUMBNAIL_YOUTUBE_IMAGE_DIRECTORY.'Equis-Energy-in-Indonesia.jpg' ) }}" alt="Equis Energy in Indonesia">
                        </a>
    
                    </div>

                </div>
            </div>
            <div class="col-md-12">
                <div class="landing-introduction-copy">
                    <div class="default-copy">
                        {!! $history['description_right'] !!}
                        <p id="mobile__content">
                            <a href="{{ $history['file_url'] or '' }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore" target="__blank">
                                {{ trans('global_page.download_pdf') }}
                            </a>
                        </p>
                    </div>
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