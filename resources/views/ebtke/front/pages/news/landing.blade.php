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

@if(isset($latest_news) && !empty($latest_news))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8 col-sm-8 col-xs-12">
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('pages/news_page.title_news') }}             
                    </h5>
    				<small class="text-gray">
                        {{ trans('pages/news_page.user_created') }}            
                    </small>
    				<ul class="article">
    					@foreach($latest_news as $key=> $landing_news)
    					<li class="article--item">
    						<h3 class="semibold margin0">
    							{{ $landing_news['title'] or '' }}
    						</h3>
    						<div class="flex">
								<small class="text-gray">
								{{ $landing_news['days_ago'] or '' }} - {{ $landing_news['total_view'] or '' }} views
								</small>
								
							</div>
							<img src="{{ $landing_news['thumbnail_url'] or '' }}" alt="{{ $landing_news['title'] or '' }}">
							<p class="news">
    							{!! $landing_news['introduction'] or '' !!}
    						</p>
    						<div class="center-align">
								<a href="{{ route('detailNews',$landing_news['slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                    {{ trans('global_page.global_page_lable_link_cta') }}                         
                                </a>
							</div>
    					</li>
    					@endforeach
    				</ul>
    			</div>
    		</div>
            @if(isset($popular_news) && !empty($popular_news))
    		<div id="desktop__content" class="col-md-4 col-sm-4 col-xs-12">
	    		<div class="card__container padding20">
	    			<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('pages/news_page.title_popular_news') }}               
                    </h5>
	    			<small class="text-gray">
                        {{ trans('pages/news_page.popular_news_view') }}             
                    </small>
	    			<ul class="populararticle">
                        @foreach($popular_news as $key=> $popular_news)
	    				<li class="flex vcenter">
	    					<a href="{{ route('detailNews',$popular_news['slug']) }}" class="populararticle--img">
								<img src="{{ $popular_news['thumbnail_url']}}" alt="Learn to Read Minds in 10 Minutes">
							</a>
							<div class="left-align">
								<a href="{{ route('detailNews',$popular_news['slug']) }}" class="populararticle--link">
									<small class="semibold">
                                    {{ $popular_news['title']}}
                                    </small>
								</a>
								<br/>
								<small class="s10 text-gray">
                                {{ $popular_news['total_view']}} Views
                                </small>
							</div>
	    				</li>
                        @endforeach
	    			</ul>
	    		</div>
    		</div>
            @endif

            @if(isset($tags_news) && !empty($tags_news))
            <hr/>
            <div id="desktop__content" class="col-md-4">
                <div class="sidepanel widget_tags">
                    <h3>
                        {!! trans('global_page.polular_tags') !!}
                    </h3>
                    <ul>
                        @foreach($tags_news as $key=> $tags)
                        <li>
                            <a href="{{ route('NewsByCategory',$tags['slug']) }}">
                                {{ $tags['title'] or '' }}
                            </a>
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