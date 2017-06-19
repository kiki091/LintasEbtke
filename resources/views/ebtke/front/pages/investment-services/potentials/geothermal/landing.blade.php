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

<section id="desktop" class="page" style="min-height: 500px;">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="default-after-banner-text">
                <h1>
                    {{ trans('pages/investment_services_page.title')}} 
                </h1>
                <h3>
                    {{ trans('pages/investment_services_page.potentials.geothermal')}}
                </h3>
            </div>
        </div>
    		<div class="col-md-12">
  			      <div class="geothermal__detail__body">
                  <iframe class="geothermal__detail__preview" src="https://docs.google.com/gview?url={{ asset(COMPANY_HISTORY_FILE_DIRECTORY.'SEKILAS-TENTANG-LINTAS-EBTKE.pdf') }}&embedded=true"></iframe>
  	          </div>
    	   </div>
        </div>
    </div>
</section>

@endsection