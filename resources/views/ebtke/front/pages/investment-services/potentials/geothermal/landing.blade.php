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
    		<div class="col-md-12">
              <h3 class="latestnews__title text-center">
                  {{ trans('pages/investment_services_page.title')}} {{ trans('pages/investment_services_page.potentials.geothermal')}}
              </h3>
  			      <div class="wrapper">
                  <iframe src="http://docs.google.com/gview?url={{ asset(COMPANY_HISTORY_FILE_DIRECTORY.'SEKILAS-TENTANG-LINTAS-EBTKE') }}&embedded=true"></iframe>
  	          </div>
    	   </div>
        </div>
    </div>
</section>

@endsection