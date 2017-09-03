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
@if(isset($nrecc_category_institution) && !empty($nrecc_category_institution))
<section id="desktop">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="default-after-banner-text">
                    <h1>{{ trans('pages/nrecc_institution_page.title') }}</h1>
                    <h3>
                        {!! trans('pages/nrecc_institution_page.introduction') !!}
                    </h3>
                </div>
                <hr/>
            </div>
            
        </div>
    </div>
	 <!-- Begin page header-->
    <div class="container">
    	<div class="row">
            <div class="col-md-4 col-sm-4 col-xs-12">
                <div class="card__container padding20">
                    <h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('pages/news_page.title_popular_news') }}               
                    </h5>
                    <small class="text-gray">
                        {{ trans('pages/news_page.popular_news_view') }}             
                    </small>
                    <hr/>
                    <div class="sidepanel widget_tags">
                        <ul>
                            @if(!empty($nrecc_category))
                                @foreach($nrecc_category as $key=> $nrecc_category)
                                    <li>
                                        <a href="{{ route('NreccInstitutionCategoryIndex',$nrecc_category['slug']) }}">
                                            {{ $nrecc_category['title'] or '' }}
                                        </a>
                                    </li>
                                @endforeach
                            @endif
                        </ul>
                    </div>
                </div>
            </div>
            
    		<div class="col-md-8 col-sm-8 col-xs-12">
                @foreach($nrecc_category_institution as $key=> $institution)
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ $institution['title_category'] or '' }}         
                    </h5>
    				<small class="text-gray">
                        {{ trans('pages/nrecc_institution_page.user_created') }}          
                    </small>
                    
    				<ul class="article">
                        @foreach($institution['list_data'] as $key=> $val)
					    <li class="article--item">
						    <h3 class="semibold margin0">
							   {{ $val['institution_title'] or '' }}
						    </h3>

						    <img src="{{ $val['institution_thumbnail_url'] or '' }}" alt="{{ $val['institution_title'] or '' }}">

						    <p class="news">
							   {!! $val['institution_introduction'] or '' !!}
						    </p>

						    <div class="center-align">
							    <a href="{{ route('NreccInstitutionDetail',$val['institution_slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                    {{ trans('global_page.global_page_lable_link_cta') }}                         
                                </a>
						    </div>
					    </li>
                        @endforeach
    				</ul>
                    
    			</div>
                @endforeach
    		</div>
            
    	</div>
    </div>
</section>
@endif
@endsection