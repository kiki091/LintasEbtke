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

            <div class="col-md-12">
                <div class="w3-content w3-display-container">
                    <img class="mySlides" src="{{ $detail['thumbnail_url'] or '' }}" style="width:100%">

                    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                    <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container style--texteditor">

        <div class="default-content">
            {!! $detail['description'] or '' !!}
        
        </div>
    </div>

    @endif
</section>

@endsection
