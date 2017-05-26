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
<section id="banner">
	@foreach($main_banner as $key=> $banner)

		<div class="image">
	        <img src="{{ $banner['image_url'] }}">
	    </div>
	@endforeach
</section>
@endif


@if(isset($data))
<section id="desktop company-overview" class="page">
	<div class="container">
		<div class="breadcrum_box add_fix">
			<a href="#" class="home" title="Home">Home</a>
			<a href="#" title="">{{ $data['title'] }}</a>
		</div>
		<h2 class="text-center"><b>{{ $data['title'] }}</b></h2>
		<h3 class="subtitle text-center">{!! $data['side_description'] !!}</h3>
		<blockquote>{!! $data['highlight_description'] !!}</blockquote>
		<div id="home-introduction-content" class="skill-bar">
		    <div class="default-content">
		    	{!! $data['description'] !!}
		    </div>
		</div>
	</div>
</section>
@endif

@stop