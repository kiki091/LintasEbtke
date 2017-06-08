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

<section id="desktop">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8">
    			
    		</div>
            
    	</div>
    </div>
</section>

@endsection