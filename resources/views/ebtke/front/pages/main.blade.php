@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }} Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }} Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }} Kementerian ESDM Republik Indonesia" />
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
      	{{--
      	<div class="switch">
        	<ul>
        		@foreach($main_banner as $key=> $val)
	        		@if($key == "0")
		        	  	<li>
		            		<div class="on"></div>
		          		</li>
	          		@else
	          			<li></li>
	          		@endif
	        	@endforeach
        	</ul>
      	</div>
      	--}}
    </div>
</section>


<!--
   ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
  |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
   | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
   | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
  |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

-->
{{--
@if(isset($latest_news) && !empty($latest_news))
<div class="swiper-container" style="height: 450px;">
    <div class="parallax-bg" style="background-image:url({{ asset(MAIN_BANNER_TRANS_IMAGE_DIRECTORY.'home-slider.jpg') }})" data-swiper-parallax="-23%"></div>
        <div class="swiper-wrapper">
        	@foreach($latest_news as $key=> $latest_news)
            <div class="swiper-slide">
                <div class="subtitle" data-swiper-parallax="-200">
                	
                		{{ $latest_news['title'] or '' }}
                </div>
                <div class="text" data-swiper-parallax="-300">
                    {!! $latest_news['introduction'] or '' !!}
                    <p>
	                    <a href="{{ route('detailNews',$latest_news['slug']) }}">
	                    	{{ trans('global_page.global_page_lable_link_cta') }}
	                    </a>
                    </p>
                </div>
            </div>
            @endforeach
        </div>
        <!-- Add Pagination -->
    <div class="swiper-pagination swiper-pagination-white"></div>
    <!-- Add Navigation -->
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
</div>
@endif
--}}
<!-- COMPANY PROFILE OVERVIEW -->

<section id="desktop company-overview" class="page">
	<!-- Begin page header-->
    <div class="page-header-wrapper">
        <div class="container">
            <div class="page-header wow fadeInUp" data-wow-delay="0.3s">
                <h3><b>{{ trans('global_page.welcome_lintas') }}</b></h3>
                <hr/>
            </div>
        </div>
    </div>
    <div class="rotate-box-1-wrapper">
    	<div class="container">
	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInLeft" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				{!! $history['introduction'] !!}
	    				{!! substr($history['description_left'],0,300) !!}
	    			</div>
	    			
	    		</div>
	    	</div>

	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInRight" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				{!! substr($history['description_left'],300,500) !!}
	    				
	    			</div>
	    		</div>
	    	</div>
			<div class="col-md-12 col-sm-12 col-xs-12" style="border-bottom: 5px #eee solid; padding-bottom: 15px;">
		    	<div class="col-md-6 col-sm-6 col-xs-12 wow fadeInLeft" data-wow-delay="1s">
					<iframe style="width: 100%" height="315" src="https://www.youtube.com/embed/IdNsrnvxl94" frameborder="0" class="iframe-responsive" style="max-height: 315px;" allowfullscreen></iframe>
				</div>
				<div id="desktop__content" class="col-md-6 col-sm-6 col-xs-12 wow fadeInRight" data-wow-delay="1s">
					<img src="{{ asset('themes/ebtke/front/images/Image-01.jpg') }}" class="img-responsive" style="max-height: 315px;">
				</div>

			</div>
    	</div>
    </div>
</section>
<!-- END MAIN BANNER -->
<!--<div class="wrapper row6 wow fadeInUp" data-wow-delay="0.3s">
	<section id="cta" class="clear"> 
    	 ################################################################################################ 
    	<div class="container">
    	<div class="three_quarter first">
      		<h2 class="heading">
      			{{ trans('pages/main_page.title_we_do') }}
      		</h2>
      		<p>
      			{{ trans('pages/main_page.sub_desc_we_do') }}
      		</p>
    	</div>
    	<div class="one_quarter pull-right">
    		<a class="btn" href="#our-services">
    			{{ trans('global_page.global_page_lable_link_cta') }} 
    			<span class="fa fa-arrow-right"></span>
    		</a>
    	</div>
    	</div>
    	<!-- ################################################################################################ -->
  	<!-- </section>
</div> -->

<!-- 

    ____  ___________ __ ____________  ____     _    ____________  _____ ________  _   __
   / __ \/ ____/ ___// //_/_  __/ __ \/ __ \   | |  / / ____/ __ \/ ___//  _/ __ \/ | / /
  / / / / __/  \__ \/ ,<   / / / / / / /_/ /   | | / / __/ / /_/ /\__ \ / // / / /  |/ / 
 / /_/ / /___ ___/ / /| | / / / /_/ / ____/    | |/ / /___/ _, _/___/ // // /_/ / /|  /  
/_____/_____//____/_/ |_|/_/  \____/_/         |___/_____/_/ |_|/____/___/\____/_/ |_/   
                                                                                         

 -->

<section id="">
	<div class="container">
	<div class="latest wow fadeInUp" data-wow-delay="0.3s"> 
	    <!-- ################################################################################################ -->
  		<h2 class="heading">
  			<b>{{ trans('pages/main_page.title_we_do') }}</b>
  		</h2>
  		<div class="col-sm-6 col-sm-6 col-xs-12">
  		<p class="text__intro__about">
  			{{ trans('pages/main_page.sub_desc_we_do') }}
  		</p>
  		</div>
	    <ul class="grid nospace group">
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="{{ route('ConsultingServices') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'Consulting-Services.png') }}" alt="">
	        			<div class="caption__bottom__services">
			            	<p class="bold uppercase">
			            		<a class="mobile_desc" href="{{ route('ConsultingServices') }}">
			            			{{ trans('pages/main_page.title_consulting_services') }}
			            		</a>
			            	</p>
			          	</div>
	        		</a>
		          	
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="{{ route('landingNews') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'news&events.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
		            		<a class="mobile_desc" href="{{ route('landingNews') }}">
		            			{{ trans('pages/main_page.title_news_&_events') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="{{ route('InvestmentServicesLanding') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'Investment_services.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="{{ route('InvestmentServicesLanding') }}">
		            			{{ trans('pages/main_page.title_investment_serrvices') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'libraries_lms.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="#">
		            			{{ trans('pages/main_page.title_libraries') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="{{ route('Tools') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'tools.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="{{ route('Tools') }}">
		            			{{ trans('pages/main_page.title_tools') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="{{ route('InvestmentServicesGreenPages') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'GreenPages.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="{{ route('InvestmentServicesGreenPages') }}">
		            			{{ trans('pages/main_page.title_green_page') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'matchlogo.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="#">
		            			{{ trans('pages/main_page.title_link_&_match') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'resour.jpg') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="#">
		            			{{ trans('pages/main_page.title_nrecc_resource') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	      	<li class="grid-item">
	        	<figure>
	        		<a class="overlay" href="http://modi.minerba.esdm.go.id" target="_blank">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'kpi-dashboard2y.png') }}" alt="">
	        		</a>
		          	<div class="caption__bottom__services">
		            	<p class="bold uppercase">
			            	<a class="mobile_desc" href="http://modi.minerba.esdm.go.id" target="_blank">
		            			{{ trans('pages/main_page.title_dashboards') }}
		            		</a>
		            	</p>
		          	</div>
	        	</figure>
	      	</li>
	    </ul>
	    <!-- ################################################################################################ -->
	</div>
	</div>
</section>


@endsection

@section('scripts')

<script>
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        parallax: true,
        speed: 600,
    });
</script>
@stop