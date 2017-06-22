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
    		<div class="col-md-8">
    			<div class="wrapper">
                    
                    <div class="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
                        <ul id="myTab" class="nav nav-tabs nav-tabs-responsive" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#recent-papers" id="recent-papers-tab" role="tab" data-toggle="tab" aria-controls="recent-papers" aria-expanded="true">
                                    <span class="text">{{ trans('pages/white_papers_page.title_recent_papers') }}</span>
                                </a>
                            </li>
                        
                            <li role="presentation">
                                <a href="#toprated" role="tab" id="toprated-tab" data-toggle="tab" aria-controls="toprated">
                                    <span class="text">{{ trans('pages/white_papers_page.title_top_rated') }}</span>
                                </a>
                            </li>

                            <li role="presentation">
                                <a href="#top-downloaded" role="tab" id="top-downloaded-tab" data-toggle="tab" aria-controls="top-downloaded">
                                    <span class="text">{{ trans('pages/white_papers_page.title_top_download') }}</span>
                                </a>
                            </li>
                        </ul>

                        <div id="myTabContent" class="tab-content">
                            @if(isset($recent_papers) && !empty($recent_papers))
                            <div role="tabpanel" class="tab-pane fade in active" id="recent-papers" aria-labelledby="recent-papers-tab">
                                @foreach($recent_papers as $key=> $recent_papers)
                                <div class="col-lg-12">

                                    <div class="col-lg-3">
                                        <img src="{{ $recent_papers['thumbnail_url'] }}" class="img-responsive" alt="{{ $recent_papers['title'] or '' }}">
                                    </div>

                                    <div class="font__normal col-lg-9">
                                        <h3>
                                            <a href="{{ route('DetailWhitePapers',$recent_papers['slug']) }}">
                                                {{ $recent_papers['title'] }}
                                            </a>
                                        </h3>
                                        <p>
                                            {{ $recent_papers['is_rating'] }} Rating || {{ $recent_papers['is_downloaded'] }} Download
                                        </p>
                                        {!! $recent_papers['description'] !!}
                                        <p>
                                            <a href="{{ route('DetailWhitePapers',$recent_papers['slug']) }}" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                                {{ trans('global_page.global_page_lable_link_cta') }}
                                            </a>
                                        </p>
                                        
                                    </div>
                                </div>
                                @endforeach
                            </div>
                            @endif

                            @if(isset($top_rated) && !empty($top_rated))
                            <div role="tabpanel" class="tab-pane fade" id="toprated" aria-labelledby="toprated-tab">
                                <p>
                                    
                                </p>
                            </div>
                            @endif

                            @if(isset($top_downloaded) && !empty($top_downloaded))
                            <div role="tabpanel" class="tab-pane fade" id="top-downloaded" aria-labelledby="top-downloaded-tab">
                                <p>
                                    
                                </p>
                            </div>
                            @endif
                        </div>
                    </div>
    	       </div>
    	   </div>
        </div>
    </div>
</section>

@endsection