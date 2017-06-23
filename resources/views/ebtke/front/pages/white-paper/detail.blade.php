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
<div class="banner--main-event" style="background-image: url({{ asset(BANNER_PAPERS_IMAGES_DIRECTORY.'whitepapers.png') }});">
    
</div>

<section id="desktop" class="page" style="min-height: 500px;">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    	   <div class="col-md-12">
                <div class="card__container padding20">
                    <h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ $detail_papers['title'] or '' }}            
                    </h5>
                </div>

                <div class="col-md-3 pull-left">
                    <img src="{{ $detail_papers['thumbnail_url'] }}" class="img-responsive" alt="{{ $detail_papers['title'] or '' }}">
                </div>

                <div class="pull-right col-md-9">
                
                    {!! $detail_papers['description'] or '' !!}
                    <p>
                        {{ $detail_papers['is_rating'] }} 
                        {{ trans('global_page.rating') }} || 
                        
                        {{ $detail_papers['is_downloaded'] }} 
                        {{ trans('global_page.download') }}
                    </p>
                    <a href="{{ $detail_papers['file_url'] or '' }}" target="__blank" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                        {{ trans('global_page.download') }}
                    </a>
                    
                </div>
    	   </div>
        </div>
    </div>
</section>

@endsection