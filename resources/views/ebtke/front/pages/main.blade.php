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
<!--
   ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
  |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
   | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
   | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
  |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

-->
@if(isset($latest_news) && !empty($latest_news))

<section class="bg-gray introduction__content">
	<div class="row">
		<div class="container">
		    <div id="owl-partners" class="owl-carousel">
		    	@foreach($latest_news as $key=> $latest_news)
					<a href="{{ route('detailNews',$latest_news['slug']) }}" class="services_item">
		        		<img src="{{ $latest_news['thumbnail_url'] or '' }}" class="img-responsive" alt="{{ $latest_news['title'] or '' }}">
						<p>{{ $latest_news['title'] or '' }}</p>
					</a>
				@endforeach
		    </div>
		</div>
	</div>
</section>

@endif
<!-- COMPANY PROFILE OVERVIEW -->

<section id="desktop company-overview" class="page">
	<!-- Begin page header-->
    <div class="page-header-wrapper">
        <div class="container">
            <div class="page-header text-center wow fadeInUp" data-wow-delay="0.3s">
                <h2>{{ $history['title'] }}</h2>
                <hr/>
                <h3 class="subtitle">
                	{!! $history['introduction'] !!}
                </h3>
            </div>
        </div>
    </div>
    <div class="rotate-box-1-wrapper">
    	<div class="container">
	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInLeft" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				{!! $history['description_left'] !!}
	    			</div>
	    		</div>
	    	</div>

	    	<div class="col-md-6">
	    		<div id="home-introduction-content" class="skill-bar wow slideInRight" data-wow-delay="0.2s">
	    			<div class="default-content">
	    				{!! $history['description_right'] !!}
	    				
	    			</div>
	    		</div>
	    	</div>
    	</div>
    </div>
</section>
<!-- END MAIN BANNER -->
<div class="wrapper row6 wow fadeInUp" data-wow-delay="0.3s">
	<section id="cta" class="clear"> 
    	<!-- ################################################################################################ -->
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
  	</section>
</div>

<!-- 

    ____  ___________ __ ____________  ____     _    ____________  _____ ________  _   __
   / __ \/ ____/ ___// //_/_  __/ __ \/ __ \   | |  / / ____/ __ \/ ___//  _/ __ \/ | / /
  / / / / __/  \__ \/ ,<   / / / / / / /_/ /   | | / / __/ / /_/ /\__ \ / // / / /  |/ / 
 / /_/ / /___ ___/ / /| | / / / /_/ / ____/    | |/ / /___/ _, _/___/ // // /_/ / /|  /  
/_____/_____//____/_/ |_|/_/  \____/_/         |___/_____/_/ |_|/____/___/\____/_/ |_/   
                                                                                         

 -->

<section id="desktop__content">
	<div class="container">
	<div class="latest wow fadeInUp" data-wow-delay="0.3s"> 
	    <!-- ################################################################################################ -->
	    <ul class="nospace group">
	      	<li>
	        	<figure>
	        		<a class="overlay" href="{{ route('ConsultingServices') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'Consulting-Services.png') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_consulting_services') }}
		            	</p>
		            	<p>
			            	<a href="{{ route('ConsultingServices') }}">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="{{ route('landingNews') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'news&events.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_news_&_events') }}
		            	</p>
		            	
		            	<p>
			            	<a href="{{ route('landingNews') }}">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="{{ route('InvestmentServicesLanding') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'Investment_services.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_investment_serrvices') }}
		            	</p>
		            	
		            	<p>
			            	<a href="{{ route('InvestmentServicesLanding') }}">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	    </ul>
	    <ul class="nospace group">
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
	        		<a class="overlay" href="{{ route('Tools') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'tools.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_tools') }}
		            	</p>
		            	<p>
			            	<a href="{{ route('Tools') }}">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	      	<li>
	        	<figure>
	        		<a class="overlay" href="{{ route('InvestmentServicesGreenPages') }}">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'GreenPages.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_green_page') }}
		            	</p>
		            	<p>
			            	<a href="{{ route('InvestmentServicesGreenPages') }}">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	    </ul>
	    <ul class="nospace group">
	      	<li>
	        	<figure>
	        		<a class="overlay" href="#">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'matchlogo.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_link_&_match') }}
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
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'resour.jpg') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_nrecc_resource') }}
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
	        		<a class="overlay" href="http://modi.minerba.esdm.go.id" target="_blank">
	        			<img src="{{ asset(SERVICES_IMAGES_DIRECTORY.'kpi-dashboard2y.png') }}" alt="">
	        		</a>
		          	<figcaption class="inspace-30 center">
		            	<p class="bold uppercase">
		            		{{ trans('pages/main_page.title_dashboards') }}
		            	</p>
		            	<p>
			            	<a href="http://modi.minerba.esdm.go.id" target="_blank">
			            		{{ trans('global_page.global_page_lable_visit_here') }} 
			            	</a>
		            	</p>
		          	</figcaption>
	        	</figure>
	      	</li>
	    </ul>
	    <!-- ################################################################################################ -->
	</div>
	</div>
</section>


@endsection