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

    <div class="container">
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
                    <h1>{{ trans('pages/investment_services_page.green_pages') }}</h1>
                    <h3>
                        CONNECT WITH GREEN PROFILES
                    </h3>
                </div>
            </div>
            <div class="col-md-12">
                    <div id="margin__centered" class="border__gray col-md-2 column sog-tile ">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.'logo_1.png') }}) "></div>
                            <div class="tile-text">
                                <span class="subhead ng-binding">
                                    Profile
                                    <span class="type ng-binding">
                                         Public sector
                                    </span>
                                </span>
                                <h1>Danish Maritime Authority</h1>
                                <h2>The Danish maritime cluster - Blue Denmark - holds a strong position within green shipping. Through energy efficient and environmentally...</h2>
                                <span class="plush"></span>
                            </div>
                        </div>
                    </div>

                    <div id="margin__centered" class="border__gray col-md-2 column sog-tile ">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.'logo_2.jpg') }}) "></div>
                            <div class="tile-text">
                                <span class="subhead ng-binding">
                                    Profile
                                    <span class="type ng-binding">
                                         Public sector
                                    </span>
                                </span>
                                <h1>Danish Maritime Authority</h1>
                                <h2>The Danish maritime cluster - Blue Denmark - holds a strong position within green shipping. Through energy efficient and environmentally...</h2>
                                <span class="plush"></span>
                            </div>
                        </div>
                    </div>

                    <div id="margin__centered" class="border__gray col-md-2 column sog-tile ">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.'logo_3.jpg') }}) "></div>
                            <div class="tile-text">
                                <span class="subhead ng-binding">
                                    Profile
                                    <span class="type ng-binding">
                                         Public sector
                                    </span>
                                </span>
                                <h1>Danish Maritime Authority</h1>
                                <h2>The Danish maritime cluster - Blue Denmark - holds a strong position within green shipping. Through energy efficient and environmentally...</h2>
                                <span class="plush"></span>
                            </div>
                        </div>
                    </div>

                    <div id="margin__centered" class="border__gray col-md-2 column sog-tile ">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.'logo_4.jpg') }}) "></div>
                            <div class="tile-text">
                                <span class="subhead ng-binding">
                                    Profile
                                    <span class="type ng-binding">
                                         Public sector
                                    </span>
                                </span>
                                <h1>Danish Maritime Authority</h1>
                                <h2>The Danish maritime cluster - Blue Denmark - holds a strong position within green shipping. Through energy efficient and environmentally...</h2>
                                <span class="plush"></span>
                            </div>
                        </div>
                    </div>

                    <div id="margin__centered" class="border__gray col-md-2 column sog-tile ">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.'logo_5.jpg') }}) "></div>
                            <div class="tile-text">
                                <span class="subhead ng-binding">
                                    Profile
                                    <span class="type ng-binding">
                                         Public sector
                                    </span>
                                </span>
                                <h1>Danish Maritime Authority</h1>
                                <h2>The Danish maritime cluster - Blue Denmark - holds a strong position within green shipping. Through energy efficient and environmentally...</h2>
                                <span class="plush"></span>
                            </div>
                        </div>
                    </div>

                    <div id="margin__centered" class="border__gray col-md-2 column sog-tile ">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ asset(INVESTMENT_SERVICES_GREEN_PAGES_DIRECTORY.'logo_6.jpg') }}) "></div>
                            <div class="tile-text">
                                <span class="subhead ng-binding">
                                    Profile
                                    <span class="type ng-binding">
                                         Public sector
                                    </span>
                                </span>
                                <h1>Danish Maritime Authority</h1>
                                <h2>The Danish maritime cluster - Blue Denmark - holds a strong position within green shipping. Through energy efficient and environmentally...</h2>
                                <span class="plush"></span>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</section>

@endsection
