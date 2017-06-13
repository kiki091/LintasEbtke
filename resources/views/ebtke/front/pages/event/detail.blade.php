@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail_event['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $detail_event['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $detail_event['meta_description'] or '' }}" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

@if(isset($detail_event) && !empty($detail_event))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container detail--header">
    	<div class="row">
    		<div class="col-md-12">
    			<a href="{{ route('MainPage') }}" class="breadcrumb text-gray">Home</a>
                <a href="{{ route('landingEvent') }}" class="breadcrumb text-gray">Events</a>
                <a href="{{ route('detailEvent',$detail_event['slug']) }}" class="breadcrumb text-gray">{{ $detail_event['title'] or '' }}</a>
    		</div>
            <div class="col-md-12">
                <h3 class="latestnews">{{ $detail_event['title'] or '' }}</h3>
                <small class="text-gray">{{ $detail_event['days_ago'] or '' }} - {{ $detail_event['total_view'] or '' }} views</small>
            </div>
    	</div>
    </div>
    <div class="container style--texteditor">
        <div class="col-md-9">
        <div class="medium-insert-images">
            <figure>
                <img src="{{ $detail_event['thumbnail_url'] or '' }}" alt="{{ $detail_event['title'] or '' }}">   
            </figure>
        </div>
        <div class="default-content">
            {!! $detail_event['introduction'] or '' !!}
            {!! $detail_event['description'] or '' !!}
        </h3>
        </div>
    </div>
</section>
@endif


<!-- 
      _    _     ____   ___    _     ___ _  _______ 
     / \  | |   / ___| / _ \  | |   |_ _| |/ / ____|
    / _ \ | |   \___ \| | | | | |    | || ' /|  _|  
   / ___ \| |___ ___) | |_| | | |___ | || . \| |___ 
  /_/   \_\_____|____/ \___/  |_____|___|_|\_\_____|
                                                    
-->

@if(isset($detail_news['related']) && !empty($detail_news['related']))
<section id="desktop">
    <!-- Begin page header-->
    <div class="container">
        <hr/>
        <div class="detail-also-like-title">
            <h1>You might also like</h1>
        </div>
        @foreach($detail_news['related'] as $key=> $related)
        
        <div id="related__news" class="col-md-4">
            <img src="{{ $related['related_thumbnail_url'] }}" class="img-responsive">
            <p>
                <a href="{{ route('detailNews',$related['related_slug']) }}">
                    <h4>{{ $related['related_title'] }}</h4>
                </a>
            </p>
            <ul>
                <li>{{ $related['related_day_ago'] }}</li>
                <li>{{ $related['related_view'] }} Views</li>
            </ul>
        </div>
        @endforeach
    </div>
</section>
@endif

@endsection