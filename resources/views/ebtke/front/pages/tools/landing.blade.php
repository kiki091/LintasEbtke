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
    <div class="container">
    	<div class="row">
    		<div class="col-md-9">
                @foreach($tools_landing as $key=> $tools_landing)
                <div>
                    
                    <div id="desktop-breadcrumb-menu" class="col-md-12">
                        <a href="" class="breadcrumb text-gray">
                            Manufacture : {{ $tools_landing['manufacture'] }}
                        </a>
                        <a href="" class="breadcrumb text-gray">
                            OS : {{ $tools_landing['platform'] }}
                        </a>
                        <a href="" class="breadcrumb text-gray">
                            {{ $tools_landing['tools_type'] }}
                        </a>
                    </div>
                    <h3 class="latestnews" style="padding-left: 15px;">
                        {{ $tools_landing['filename'] }} Version : {{ $tools_landing['version'] }}
                    </h3>
                    <p style="padding-left: 15px;">
                        <i>{{ $tools_landing['tools_type'] }}</i> || <i>{{ $tools_landing['country'] }}</i>
                    </p>
                    <hr/>
        			<div class="col-lg-3 pull-left">
                        <img src="{{ $tools_landing['thumbnail_url'] }}" class="img-responsive" alt="{{ $tools_landing['filename'] }}">         
                    </div>
                    <div class="col-lg-2 pull-right">
                        <img src="{{ asset(TOOLS_IMAGES_DIRECTORY.'progress_download.jpg') }}" class="img-responsive">
                        <p class="info__download">{{ $tools_landing['is_rating'] }} Ratings</p>
                        <p class="info__download">{{ $tools_landing['is_downloaded'] }} Downloads</p>
                    </div>
                    <div class="col-lg-7 pull-right">
                        <p>{{ $tools_landing['description'] }}</p>
                    </div>
                    <div class="col-lg-12">
                        <p class="pull-right">
                            <a href="{{ $tools_landing['file_url'] }}" target="__blank" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">Download</a>
                        </p>
                    </div>
                </div>
                @endforeach
    	   </div>
        </div>
    </div>
</section>

@endsection