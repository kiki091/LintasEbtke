@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ 'Kementerian ESDM Republik Indonesia' }}
@stop

@section('seo')
    <meta name="keywords" content="Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="Kementerian ESDM Republik Indonesia" />
@stop

@section('content')
<!-- MAIN BANNER -->
<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->
<section id="desktop image-slider">
	<!-- Slider -->
    <div id="slider">
      	<div class="slides">
      		@foreach($main_banner as $key=> $val_banner)
	        <div class="slider">
	          	<div class="legend"></div>
	          	<div class="content">
	            	<div class="content-txt">
	              		<h1>{{ $val_banner['title'] or '' }}</h1>
	              		<h2>{{ $val_banner['description'] or '' }}</h2>
	            	</div>
	          	</div>
	          	<div class="image">
	            	<img src="{{ $val_banner['image_url'] or '' }}">
	          	</div>
	        </div>
	        @endforeach
      	</div>
    </div>
</section>

<!-- END MAIN BANNER -->
<div class="wrapper row6 wow fadeInUp" data-wow-delay="0.3s">
	<section id="cta" class="clear"> 
    	<!-- ################################################################################################ -->
    	<div class="three_quarter first">
      		<h2 class="heading">
      			{{ trans('pages/main_page.title_we_do') }}
      		</h2>
      		<p>
      			{{ trans('pages/main_page.sub_desc_we_do') }}
      		</p>
    	</div>
    	<div class="one_quarter">
    		<a class="btn" href="#">
    			{{ trans('global_page.global_page_lable_link_cta') }} 
    			<span class="fa fa-arrow-right"></span>
    		</a>
    	</div>
    	<!-- ################################################################################################ -->
  	</section>
</div>
<section id="desktop__content">
	
	<div class="latest wow fadeInUp" data-wow-delay="0.3s"> 
	    <!-- ################################################################################################ -->
	    <ul class="nospace group">
	      	<li>
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'consulting_services.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_consulting_services') }}
		            	</p>
		            	<p>
			            	<a href="#">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'news&events.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_news_&_events') }}
		            	</p>
		            	
		            	<p>
			            	<a href="#">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'Investment_services.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_investment_serrvices') }}
		            	</p>
		            	
		            	<p>
			            	<a href="#">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'libraries_lms.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_libraries') }}
		            	</p>
		            	<p>
			            	<a href="#">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'tools.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_tools') }}
		            	</p>
		            	<p>
			            	<a href="#">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	    </ul>
	    <!-- ################################################################################################ -->
	</div>
</section>

<!-- COMPANY PROFILE OVERVIEW -->

<section id="desktop company-overview" class="page">
	<!-- Begin page header-->
    <div class="page-header-wrapper">
        <div class="container">
            <div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
                <h2>{!! trans('pages/main_page.title') !!}</h2>
                <hr/>
                <h3 class="subtitle">
                	{{ trans('pages/main_page.introduction') }}
                </h3>
            </div>
        </div>
    </div>
    <div class="rotate-box-1-wrapper">
    	<div class="container">
	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInLeft" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				{!! trans('pages/main_page.introduction_left') !!}
	    			</div>
	    		</div>
	    	</div>

	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInRight" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				{!! trans('pages/main_page.introduction_right') !!}
	    				
	    			</div>
	    		</div>
	    	</div>
    	</div>
    </div>
</section>

<!-- EVENT AND NEWS -->
<section id="latest-news" class="bg-gray-transparant">
	<div class="container">
		<div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
            <h2>{{ trans('pages/main_page.title_news') }}</h2>
            <div class="devider"></div>
        </div>
        @foreach($latest_news as $key=> $news)
		<div class="row-fluid skill-bar wow fadeInUp" data-wow-delay="0.4s">
			<div class="news_landing_grid">
				<img src="{{ $news['thumbnail_url'] }}" class="img-responsive" alt="{{ $news['title'] }}">
				<h2>{{ $news['title'] }}</h2>
				<p>
				{{ $news['introduction'] }}
				</p>
				<center>
				<a href="{{ $news['slug'] }}" class="arrow-cta float-center-version text-center">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    		</center>
			</div>
		</div>
		@endforeach
	</div>
</section>
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
				        Follow us @djebtke_kesdm  <br>
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