@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ 'PT Pupuk Sriwidjaja Palembang (Pusri)' }}
@stop

@section('seo')
    <meta name="keywords" content="" />
    <meta name="description" content="" />
@stop

@section('content')
<!-- MAIN BANNER -->

<section id="desktop image-slider">
	<!-- Slider -->
    <div id="slider">
      	<div class="slides">
      		
	        <div class="slider">
	          	<div class="legend"></div>
	          	<div class="content">
	            	<div class="content-txt">
	              		<h1>title</h1>
	              		<h2>description</h2>
	            	</div>
	          	</div>
	          	<div class="image">
	            	<img src="image_url">
	          	</div>
	        </div>
	        
      	</div>
    </div>
</section>

<!-- END MAIN BANNER -->

<!-- COMPANY PROFILE OVERVIEW -->

<section id="desktop company-overview" class="page">
	<!-- Begin page header-->
    <div class="page-header-wrapper">
        <div class="container">
            <div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
                <h2>title</h2>
                <div class="devider"></div>
                <h3 class="subtitle">side_description</h3>
            </div>
        </div>
    </div>
    <div class="rotate-box-1-wrapper">
    	<div class="container">
	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInLeft" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				
	    				description_left
	    				
	    			</div>
	    		</div>
	    	</div>

	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInRight" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				<p>
	    					description_right
	    					<a href="#" class="arrow-cta float-right-version">
	    						{{ trans('global_page.global_page_lable_link_cta') }}
	    					</a>
	    				</p>
	    			</div>
	    		</div>
	    	</div>
    	</div>
    </div>
</section>

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

<section id="content__bottom">
	<div class="container">
		<div class="row">
			<div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
	            <h2 class="font-courgette font-black">
	            	title
	            </h2>
	            <div class="devider"></div>
	        </div>
	    </div>
	    <div class="row">
	    	<div class="col-md-4">
	    		description_left
	    		
	    	</div>
	    	<!-- DESKTOP VIEW -->
	    	<div id="desktop__content" class="col-md-4">
	    		<div id="content__bottom__image">
	    			<div class="content__bottom__container">
	    				<div class="content__bottom__image__container">
	    					<img src="thumbnail_url">
	    				</div>
	    			</div>
	    		</div>
	    	</div>
	    	<!-- END DESKTOP VIEW -->
	    	<!-- MOBILE VIEW -->
	    	<div id="mobile__content" class="col-mobile-4 col-md-4">
	    		<img class="images__banner" src="filename_url">

	    	</div>
	    	<!-- END MOBILE VIEW -->
	    	<div class="col-md-4 margin-bottom">
	    		description_right
	    		<a href="#" class="arrow-cta float-center-version text-center pull-right">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    	</div>
	    </div>
</section>
<!-- END GP3K OVERVIEW -->


<!-- LATEST NEWS -->

<section id="latest-news" class="bg-gray-transparant">
	<div class="container">
		<div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
            <h2>Berita Terkini</h2>
            <div class="devider"></div>
        </div>
       
		<div class="row-fluid skill-bar wow slideInLeft" data-wow-delay="0.4s">
			<div class="news_landing_grid">
				<img src="thumbnail_url" alt="title">
				<h2>title</h2>
				<p>
				side_description
				</p>
				<center>
				<a href="slug" class="arrow-cta float-center-version text-center">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    		</center>
			</div>
		</div>
		
		<div class="row-fluid skill-bar wow slideInRight" data-wow-delay="0.4s">
			<div class="news_landing_grid">
				<img src="thumbnail_url" alt="title">
				<h2>title'</h2>
				<p>
				side_description
				</p>
				<center>
				<a href="#" class="arrow-cta float-center-version text-center">
	    			{{ trans('global_page.global_page_lable_link_cta') }}
	    		</a>
	    		</center>
			</div>
		</div>
	</div>
</section>
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