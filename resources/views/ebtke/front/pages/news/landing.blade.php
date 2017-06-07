@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }}" />
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
<section id="desktop" class="page">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8">
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">LATEST ARTICLE</h5>
    				<small class="text-gray">Most updated articles posted by USERS</small>
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
								<a href="{{ route('detailNews',$landing_news['slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">READ MORE</a>
							</div>
    					</li>
    					@endforeach
    				</ul>
    			</div>
    		</div>
    		<div id="desktop__content" class="col-md-4">
	    		<div class="card__container padding20">
	    			<h5 class="s15 uppercase margin0 brandon medium spacing1">POPULAR ARTICLE</h5>
	    			<small class="text-gray">Articles that read by more viewers</small>
	    			<ul class="populararticle">
	    				<li class="flex vcenter">
	    					<a href="javascript:void(0);" class="populararticle--img">
								<img src="http://mhg.ayana.com/images/gm_corner/1196211457_Main-Banner---2.jpg" alt="Learn to Read Minds in 10 Minutes">
							</a>
							<div class="left-align">
								<a href="http://mhg.ayana.com/ayana/gm-corner/detail/learn-to-read-minds-in-10-minutes" class="populararticle--link">
									<small class="semibold">Learn to Read Minds in 10 Minutes</small>
								</a>
								<br/>
								<small class="s10 text-gray">10 Views</small>
							</div>
	    				</li>
	    			</ul>
	    		</div>
    		</div>
    	</div>
    </div>
</section>
@endif
@endsection