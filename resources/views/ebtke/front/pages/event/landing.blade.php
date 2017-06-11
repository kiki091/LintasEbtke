@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or 'Kementerian ESDM Republik Indonesia' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or 'Kementerian ESDM Republik Indonesia' }}" />
    <meta name="description" content="{{ $seo['meta_description'] or 'Kementerian ESDM Republik Indonesia' }}" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

@if(isset($latest_event) && !empty($latest_event))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8">
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('pages/news_page.title_news') }}             
                    </h5>
    				<small class="text-gray">
                        {{ trans('pages/news_page.user_created') }}            
                    </small>
    				<ul class="article">
    					@foreach($latest_event as $key=> $landing_event)
    					<li class="article--item">
    						<h3 class="semibold margin0">
    							{{ $landing_event['title'] or '' }}
    						</h3>
    						<div class="flex">
								<small class="text-gray">
								{{ $landing_event['days_ago'] or '' }} - {{ $landing_event['total_view'] or '' }} views
								</small>
								
							</div>
							<img src="{{ $landing_event['thumbnail_url'] or '' }}" alt="{{ $landing_event['title'] or '' }}">
							<p class="news">
    							{!! $landing_event['introduction'] or '' !!}
    						</p>
    						<div class="center-align">
								<a href="{{ route('detailEvent',$landing_event['slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                    {{ trans('global_page.global_page_lable_link_cta') }}                         
                                </a>
							</div>
    					</li>
    					@endforeach
    				</ul>
    			</div>
    		</div>
            @if(isset($popular_event) && !empty($popular_event))
    		<div id="desktop__content" class="col-md-4">
	    		<div class="card__container padding20">
	    			<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('pages/news_page.title_popular_news') }}               
                    </h5>
	    			<small class="text-gray">
                        {{ trans('pages/news_page.popular_news_view') }}             
                    </small>
	    			<ul class="populararticle">
                        @foreach($popular_event as $key=> $popular_event)
	    				<li class="flex vcenter">
	    					<a href="{{ route('detailEvent',$popular_event['slug']) }}" class="populararticle--img">
								<img src="{{ $popular_event['thumbnail_url']}}" alt="Learn to Read Minds in 10 Minutes">
							</a>
							<div class="left-align">
								<a href="{{ route('detailEvent',$popular_event['slug']) }}" class="populararticle--link">
									<small class="semibold">
                                    {{ $popular_event['title']}}
                                    </small>
								</a>
								<br/>
								<small class="s10 text-gray">
                                {{ $popular_event['total_view']}} Views
                                </small>
							</div>
	    				</li>
                        @endforeach
	    			</ul>
	    		</div>
    		</div>
            @endif
    	</div>
    </div>
</section>
@endif
@endsection