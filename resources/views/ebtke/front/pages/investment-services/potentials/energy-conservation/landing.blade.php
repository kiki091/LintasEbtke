@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }} | Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }} | Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }} | Kementerian ESDM Republik Indonesia" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->
<div class="banner--main-event" style="background-image: url({{ asset(ENERGY_CONSERVATION_DIRECTORY.'banner-2.jpg') }});">
    
</div>
<section id="desktop" class="page" style="min-height: 500px;">
	<!-- Begin page header-->
    <div class="container">
    	    <div class="row">
      		      <div class="col-md-12">
                      <div class="default-after-banner-text">
                            <h1 class="latestnews__title text-center">
                                 {{ trans('pages/investment_services_page.potentials.energy_conservation.title')}}
                            </h1>
                            <h3>
                                {{ trans('pages/investment_services_page.potentials.energy_conservation.description')}}
                            </h3>
                            <br/>
                            <hr/>
                      </div>
          			      <div class="wrapper">
                          <div class="col-md-12">
                              <div class="row news">
                                  @if(!empty($energy_conservation))
                                      @foreach($energy_conservation as $key=> $energy_conservation)
                                          <div class="col-md-6  text-left">
                                              <img src="{{ $energy_conservation['thumbnail_url'] }}" class="img-responsive picsGall" alt="{{ $energy_conservation['title'] }}">
                                              <h3>
                                                    <a href="{{ route('InvestmentServicesPotentialsEnergyConservationDetail',$energy_conservation['slug']) }}">
                                                        {{ $energy_conservation['title'] or '' }}
                                                    </a>
                                              </h3>
                                              <ul>
                                                  <li>
                                                      <i class="fa fa-calendar"> </i>
                                                      {{ $energy_conservation['days_ago'] or '' }}
                                                  </li>
                                              </ul>
                                              <p>
                                                  {!! $energy_conservation['introduction'] or '' !!}
                                                  <a class="readMore" href="">
                                                      <i class="fa fa-angle-right"></i>

                                                  </a>
                                              </p>
                                              <hr class="hrNews">
                                          </div>
                                      @endforeach
                                  @endif
                              </div>
                          </div>
          	          </div>
      	        </div>
          </div>
    </div>
</section>

@endsection