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
                    <h3 class="subtitle">
                        {{ trans('pages/green_page.introduction') }}
                    </h3>
                </div>
            </div>
            @if(isset($landing) && !empty($landing))
            <div class="col-md-12">
                <ul id="filters" class="clearfix">

                   
                        <li>
                            <span class="filter active" data-filter=".{{ trans('pages/green_page.slug_cat_1') }}, .{{ trans('pages/green_page.slug_cat_2') }}, .{{ trans('pages/green_page.slug_cat_3') }}, .{{ trans('pages/green_page.slug_cat_4') }}, .{{ trans('pages/green_page.slug_cat_5') }}">
                                {{ trans('pages/green_page.all_cat') }}
                            </span>
                        </li>
                        @foreach($category as $key=> $val_cat)
                        <li>
                            <span class="filter" data-filter=".{{ $val_cat['slug'] }}">
                                {{ $val_cat['title'] }}
                            </span>
                        </li>
                        @endforeach
                </ul>
                <div id="green__pages__list">
                @foreach($landing as $key=> $val_landing)
                <div class="col-md-3 col-sm-3 col-xs-12 green__pages {{ $val_landing['slug_category'] }}" data-cat="{{ $val_landing['slug_category'] }}">
                    <div class="border__gray sog-tile col-md-12">
                        <div style="height: 320px;">
                            <div class="photo-bg" style="background-image:url({{ $val_landing['thumbnail_url'] }}) "></div>
                            <div class="tile-text">
                                <h1>{{ $val_landing['office_name'] }}</h1>
                                <h2>{!! $val_landing['introduction'] !!}</h2>
                                <a href="{{ route('InvestmentServicesGreenPagesDetail',$val_landing['slug']) }}">
                                    <span class="plush"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
                </div>
            </div>
            @endif
        </div>
    </div>
</section>

@endsection
