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

<div class="banner--main-event" style="background-image: url({{ asset(BANNER_INDUSTRI_PAGES_DIRECTORY.'banner_industri.jpg') }});">
    <div class="banner__content">
        <h1 class="banner__content__heading">RENEWABLE INDUSTRY</h1>
    </div>
</div>
<!--
       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

    -->
@if(isset($landing_industri) && !empty($landing_industri))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8">
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('navigation/menu.menu_information_services')}}           
                    </h5>
    				<small class="text-gray">
                        {{ trans('pages/news_page.user_created') }}            
                    </small>
    				<ul class="article">
    					@foreach($landing_industri as $key=> $industri)
    					<li class="article--item">
    						<h3 class="semibold margin0">
    							{{ $industri['title'] or '' }}
    						</h3>

							<img src="{{ $industri['thumbnail_url'] or '' }}" alt="{{ $industri['title'] or '' }}">

							<p class="news">
    							{!! $industri['introduction'] or '' !!}
    						</p>

    						<div class="center-align">
								<a href="{{ route('IndusrtiDetail',$industri['slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                    {{ trans('global_page.global_page_lable_link_cta') }}                         
                                </a>
							</div>
    					</li>
    					@endforeach
    				</ul>
    			</div>
    		</div>
    	</div>
    </div>
</section>
@endif
@endsection