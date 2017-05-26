@extends('pusri.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or 'PT Pupuk Sriwidjaja Palembang (Pusri)' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }}" />
@stop

@section('content')
<!-- MAIN BANNER -->
@if(isset($main_banner))
<section id="desktop image-slider">
	<!-- Slider -->
    <div id="slider">
      	<div class="slides">
      		@foreach($main_banner as $key=> $banner)
	        <div class="slider">
	          	<div class="legend"></div>
	          	<div class="content">
	            	<div class="content-txt">
	              		<h1>{{ $banner['title'] }}</h1>
	              		<h2>{{ $banner['description'] }}</h2>
	            	</div>
	          	</div>
	          	<div class="image">
	            	<img src="{{ $banner['image_url'] }}">
	          	</div>
	        </div>
	        @endforeach
      	</div>
      	{{--
      	<div class="switch">
	        <ul>
	        @for($i=0;$i < count($main_banner); $i++)
	        	@if($i == 0)
		        <li>
		            <div class="on"></div>
		        </li>
		        @else
		        <li></li>
		        @endif
		    @endfor
	        </ul>
      	</div>
      	--}}
    </div>
</section>
@endif
<!-- END MAIN BANNER -->

<!-- COMPANY PROFILE OVERVIEW -->
@if(isset($company_overview['desktop']))
<section id="desktop company-overview" class="page">
	<!-- Begin page header-->
    <div class="page-header-wrapper">
        <div class="container">
            <div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
                <h2>{{ $company_overview['desktop']['title'] }}</h2>
                <div class="devider"></div>
                <h3 class="subtitle">{!! $company_overview['desktop']['side_description'] !!}</h3>
            </div>
        </div>
    </div>
    <div class="rotate-box-1-wrapper">
    	<div class="container">
	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInLeft" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				
	    				{!! $company_overview['desktop']['description_left'] !!}
	    				
	    			</div>
	    		</div>
	    	</div>

	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInRight" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				<p>
	    					{!! $company_overview['desktop']['description_right'] !!}
	    					<a href="{{ route('CompanyProfile',$company_overview['desktop']['slug'] ) }}" class="arrow-cta float-right-version">
	    						{{ trans('global_page.global_page_lable_link_cta') }}
	    					</a>
	    				</p>
	    			</div>
	    		</div>
	    	</div>
    	</div>
    </div>
</section>
@endif
<!-- END COMPANY PROFILE OVERVIEW -->

<!-- TOTAL PRODUCTION INFORMATION -->
<section class="banner-images" style="background:url('bin/db/images/produksi/banner.jpg');">
	<div class="container full__width absolute">
		<div class="row">
			<div class="page-header text-center">
	            <h2 class="font-courgette font-white wow fadeInUp" data-wow-delay="0.3s">TOTAL PRODUKSI</h2>
	            <div class="devider"></div>
	            <div class="content__production__urea col-md-6 wow fadeInUp" data-wow-delay="0.6s">
		            <h3 class="font-white">
		            	UREA
		            	<br/>
		            	<span class="count__number"><b>1671160</b></span>
		            	<br/>
		            	TON
		            </h3>
	            </div>
	            <div class="content__production__amoniak col-md-6 wow fadeInUp" data-wow-delay="0.6s">
		            <h3 class="font-white">
		            	AMONIAK
		            	<br/>
		            	<span class="count__number"><b>1221900</b></span>
		            	<br/>
		            	TON
		            </h3>
	            </div>
	        </div>
		</div>
	</div>
	<div class="bg__second__section"></div>
</section>
<!-- END TOTAL PRODUCTION INFORMATION -->

<!-- GP3K OVERVIEW -->
@if(!empty($gp3k_overview))
<section id="content__bottom">
	<div class="container">
		<div class="row">
			<div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
	            <h2 class="font-courgette font-black">
	            	{{ $gp3k_overview['title'] }}
	            </h2>
	            <div class="devider"></div>
	        </div>
	    </div>
	    <div class="row">
	    	<div class="col-md-4">
	    		{!! $gp3k_overview['description_left'] !!}
	    		
	    	</div>
	    	<!-- DESKTOP VIEW -->
	    	<div id="desktop__content" class="col-md-4">
	    		<div id="content__bottom__image">
	    			<div class="content__bottom__container">
	    				<div class="content__bottom__image__container">
	    					<img src="{{ $gp3k_overview['thumbnail_url'] }}">
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<!-- END DESKTOP VIEW -->
	    	<!-- MOBILE VIEW -->
	    	<div id="mobile__content" class="col-mobile-4 col-md-4">
	    		<img class="images__banner" src="{{ $gp3k_overview['filename_url'] }}">

	    	</div>
	    	<!-- END MOBILE VIEW -->
	    	<div class="col-md-4 margin-bottom">
	    		{!! $gp3k_overview['description_right'] !!}
	    		<a href="{{ $gp3k_overview['slug'] }}" class="arrow-cta float-center-version text-center pull-right">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    	</div>
	    </div>
</section>
@endif
<!-- END GP3K OVERVIEW -->

{{--
@if(isset($gcg_overview))
<section id="category-landing-pages">
	<div class="container">
		<div class="row">
			<div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
	            <h2 class="font-courgette">{{ $gcg_overview['title'] }}</h2>
	            <div class="devider"></div>
	            <h3 class="subtitle">
	            	{!! $gcg_overview['side_description'] !!}	
	            </h3>
	        </div>
	        <div class="col-md-5 skill-bar wow slideInLeft" data-wow-delay="0.4s">
	        	<img class="content_gcg_mobile_images img-responsive img-rounded img-with-opacity" src="{{ $gcg_overview['thumbnail_url'] }}">
	        </div>
	        <div class="col-md-7 skill-bar wow slideInRight" data-wow-delay="0.4s">
	        	{!! $gcg_overview['description'] !!}

	        	<a href="{{ $gcg_overview['slug'] }}" class="arrow-cta float-right-version">
					{{ trans('global_page.global_page_lable_link_cta') }}
				</a>
	        </div>
		</div>
	</div>
</section>
@endif
--}}

<!-- LATEST NEWS -->
@if(isset($news_event))
<section id="latest-news" class="bg-gray-transparant">
	<div class="container">
		<div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
            <h2>Berita Terkini</h2>
            <div class="devider"></div>
        </div>
        @foreach($news_event['1'] as $key=> $news)
		<div class="row-fluid skill-bar wow slideInLeft" data-wow-delay="0.4s">
			<div class="news_landing_grid">
				<img src="{{ $news['thumbnail_url'] }}" alt="{{ $news['title'] }}">
				<h2>{{ $news['title'] }}</h2>
				<p>
				{{ $news['side_description'] }}
				</p>
				<center>
				<a href="{{ $news['slug'] }}" class="arrow-cta float-center-version text-center">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    		</center>
			</div>
		</div>
		@endforeach
		@foreach($news_event['2'] as $key=> $event)
		<div class="row-fluid skill-bar wow slideInRight" data-wow-delay="0.4s">
			<div class="news_landing_grid">
				<img src="{{ $event['thumbnail_url'] }}" alt="{{ $event['title'] }}">
				<h2>{{ $event['title'] }}</h2>
				<p>
				{{ $event['side_description'] }}
				</p>
				<center>
				<a href="{{ $event['slug'] }}" class="arrow-cta float-center-version text-center">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    		</center>
			</div>
		</div>
		@endforeach
	</div>
</section>
@endif
<!-- END LATEST NEWS -->

<!--
   ___ _   _ ____ _____  _    ____ ____      _    __  __
  |_ _| \ | / ___|_   _|/ \  / ___|  _ \    / \  |  \/  |
   | ||  \| \___ \ | | / _ \| |  _| |_) |  / _ \ | |\/| |
   | || |\  |___) || |/ ___ \ |_| |  _ <  / ___ \| |  | |
  |___|_| \_|____/ |_/_/   \_\____|_| \_\/_/   \_\_|  |_|

-->
<section id="group-landing-instagram-section" class="bg-gray-transparant">
	<div id="group-landing-instagram-item-container">
		<div class="group-landing-instagram-item title-version">
			<div class="group-landing-instagram-title-container">
				<div class="instagram-bg-transparent">
					<div class="group-landing-instagram-title-center">
						<h3 class="title">Snap &amp; Tag</h3>
						<h3>Instagrammable places,  <br>insta-worthy memories.</h3>
					</div>
					<h4>
				        Follow us @ayanaresort  <br>
				        @rimbajimbaran  <br>
				        @rockbarbali
			        </h4>
			    </div>
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_1.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_2.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_3.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_4.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_5.jpg') }}">
			</div>
		</div>
	</div>

	<div id="group-landing-instagram-item-container">
		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_6.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_7.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_8.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_9.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_10.jpg') }}">
			</div>
		</div>

		<div class="group-landing-instagram-item">
			<div class="manic-image-container image-loaded-version">
				<img src="{{ asset(INSTAGRAM_IMAGES_DIRECTORY.'pic_11.jpg') }}">
			</div>
		</div>
	</div>
</section>
<!-- END GALLERI IMAGES INSTAGRAM -->
@endsection