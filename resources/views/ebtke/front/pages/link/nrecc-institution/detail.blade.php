@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $nrecc_institution['meta_title'] or 'Kementerian ESDM Republik Indonesia' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $nrecc_institution['meta_keyword'] or 'Kementerian ESDM Republik Indonesia' }}" />
    <meta name="description" content="{{ $nrecc_institution['meta_description'] or 'Kementerian ESDM Republik Indonesia' }}" />
@stop

@section('content')

<!--
       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

    -->
@if(isset($nrecc_institution) && !empty($nrecc_institution))
<section id="desktop">
    <div class="section mainbanner">
        <div class="containerfull">
            <div class="slick-mainbanner slick-initialized slick-slider">
                <div aria-live="polite" class="slick-list draggable">
                    <div class="slick-track">
                        <div class="slick-slide slick-current slick-active">
                            <div class="bg-responsive img--mainbanner" style="background-image: url({{ $nrecc_institution['introduction_images_url'] }});"></div>
                        </div>
                    </div>
                </div>
                <div class="container768 content center">
                    <center>
                        <h1 class="text-white light uppercase">
                            {{ $nrecc_institution['category_title'] }}
                        </h1>
                    </center>
                    <div class="main__banner--text">
                        <h2 class="text-white gotham light uppercase">
                            {{ $nrecc_institution['title'] }}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div id="desktop__content" class="col-md-3 col-sm-3 col-xs-12"></div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="default-after-banner-text">
                    <h3>{!! $nrecc_institution['introduction'] !!}</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="banner--main-event" style="background-image: url({{ $nrecc_institution['description_images_url'] }});"></div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-sm-5 col-xs-12">
                <div class="landing-introduction-copy">
                    <div class="default-copy">
                        {!! $nrecc_institution['side_description'] !!}
                    </div>
                </div>
            </div>
            <div class="col-md-7 col-sm-7 col-xs-12">
                <div class="landing-introduction-copy">
                    <div class="default-copy">
                        {!! $nrecc_institution['description'] !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endif
@endsection