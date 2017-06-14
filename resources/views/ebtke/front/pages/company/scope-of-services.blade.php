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

<section id="desktop" class="page" style="min-height: 500px;">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8">
    			<h1>{{ trans('pages/scope_lintas_page.title_scope') }}
          
          <div class="sidepanel widget_meta">
            <ul>
              <li>
                <a href="">{{ trans('pages/scope_lintas_page.description_1') }}</a>
              </li>
              <li>
                <a href="">{{ trans('pages/scope_lintas_page.description_2') }}</a>
              </li>
              <li>
                <a href="">{{ trans('pages/scope_lintas_page.description_3') }}</a>
              </li>
              <li>
                <a href="">{{ trans('pages/scope_lintas_page.description_4') }}</a>
              </li>
            </ul>
          </div>
    		</div>
            
    	</div>
    </div>
</section>

@endsection