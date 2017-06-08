@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail_news['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $detail_news['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $detail_news['meta_description'] or '' }}" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

@if(isset($detail_news) && !empty($detail_news))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container detail--header">
    	<div class="row">
    		<div class="col-md-12">
    			<a href="{{ route('MainPage') }}" class="breadcrumb text-gray">Home</a>
                <a href="{{ route('landingNews') }}" class="breadcrumb text-gray">News</a>
                <a href="{{ route('detailNews',$detail_news['slug']) }}" class="breadcrumb text-gray">{{ $detail_news['title'] or '' }}</a>
    		</div>
            <div class="col-md-12">
                <h3 class="latestnews">{{ $detail_news['title'] or '' }}</h3>
                <small class="text-gray">{{ $detail_news['days_ago'] or '' }} - {{ $detail_news['total_view'] or '' }} views</small>
            </div>
    	</div>
    </div>
    <div class="container style--texteditor">
        <div class="col-md-9">
        <div class="medium-insert-images">
            <figure>
                <img src="{{ $detail_news['thumbnail_url'] or '' }}" alt="{{ $detail_news['title'] or '' }}">   
            </figure>
        </div>
        <div class="default-content">
            {!! $detail_news['introduction'] or '' !!}
            {!! $detail_news['description'] or '' !!}
        </h3>
        </div>
    </div>
</section>
@endif
@endsection