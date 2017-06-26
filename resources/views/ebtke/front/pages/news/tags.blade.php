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
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->
<div class="banner--main-event" style="background-image: url(http://loc.mhg.dev/images/latestnews-main/bgsectiontop1x.png);">
    <div class="banner__content">
        <h1 id="font-white" class="banner__content__heading">
            {{ trans('pages/news_page.tags_title') }}
        </h1>
        <p class="banner__content__copyright">
            {{ trans('pages/news_page.tags_introducrion') }}
        </p>
    </div>
</div>
@if(isset($list_news) && !empty($list_news))
<section class="page">
    <div class="container">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="default-after-banner-text">
                <h1>{{ $list_news['tag_title'] }}</h1>
                <h3>
                    {!! $list_news['tag_introduction'] !!}
                </h3>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row">
                <hr/>
                @foreach($list_news['news'] as $key=> $value)
                <div class="blog_post margbot50 clearfix animated fadeInUp">
                    <div class="blog_post_img">
                        <img src="{{ $value['thumbnail_url'] }}">
                        <a class="zoom"></a>
                    </div>
                    <div class="blog_post_descr">
                        <!-- <div class="blog_post_date">JANUARY 30 | 21:30</div> -->
                        <a class="blog_post_title">
                            {{ $value['title'] }}
                        </a>
                        <ul class="blog_post_info">
                            <li>
                                <a href="{{ route('MainPage') }}">
                                    {{ trans('navigation/menu.menu_home')}}
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('landingNews') }}">
                                    {{ trans('navigation/menu.menu_news_and_event')}}
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    {{ Request::segment(4) }}
                                </a>
                            </li>
                        </ul>
                        <hr/>
                        <div class="blog_post_content">
                            {!! $value['introduction'] !!}
                        </div>
                        <a class="read_more_btn" href="{{ route('detailNews',$value['slug']) }}">
                            {{ trans('global_page.global_page_lable_link_cta') }} 
                        </a>
                    </div>
                </div>
                @endforeach
                <hr/>
            </div>
        </div>
    </div>
</section>
@endif
@endsection

@section('scripts')
@stop