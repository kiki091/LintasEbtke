@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or 'Kementerian ESDM Republik Indonesia' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or 'Kementerian ESDM Republik Indonesia' }}" />
    <meta name="description" content="{{ $seo['meta_description'] or 'Kementerian ESDM Republik Indonesia' }}" />
@stop

@section('content')

<!--
       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

    -->

<section id="desktop">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="default-after-banner-text">
                    <h1>{{ trans('pages/nrecc_event_page.title') }}</h1>
                    <h3>
                        {!! trans('pages/nrecc_event_page.introduction') !!}
                    </h3>
                </div>
                <hr/>
            </div>
            
        </div>
    </div>
	 <!-- Begin page header-->
    <div class="container">
    	<div class="row">
            @if(isset($nrecc_events) && !empty($nrecc_events))
    		<div class="col-md-8 col-sm-8 col-xs-12">
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        NRECC CATEGORY       
                    </h5>
    				<small class="text-gray">
                        {{ trans('pages/nrecc_institution_page.user_created') }}          
                    </small>
                    
    				<ul class="article">
                        @foreach($nrecc_events as $key=> $val)
					    <li class="article--item">
						    <h3 class="semibold margin0">
							   {{ $val['title'] or '' }}
						    </h3>

						    <img src="{{ $val['thumbnail_url'] or '' }}" alt="{{ $val['title'] or '' }}">

						    <p class="news">
							   {!! $val['introduction'] or '' !!}
						    </p>

						    <div class="center-align">
							    <a href="{{ route('NreccEventsDetail',$val['slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                    {{ trans('global_page.global_page_lable_link_cta') }}                         
                                </a>
						    </div>
					    </li>
                        @endforeach
    				</ul>
                    
    			</div>
    		</div>
            @endif
    	</div>
    </div>
</section>

@endsection