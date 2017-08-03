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
<section id="blog">
    <div class="container">
        <div class="row">
            <div class="col-md-9">
            @if(isset($struktur_organisasi) && !empty($struktur_organisasi))
                @foreach($struktur_organisasi as $key=> $value)
                <div class="blog_post margbot50 clearfix animated fadeInUp">
                    <div class="blog_post_img">
                        <img src="{{ $value['thumbnail_url'] }}">
                        <a class="zoom"></a>
                    </div>
                    <div class="blog_post_descr">
                        <!-- <div class="blog_post_date">JANUARY 30 | 21:30</div> -->
                        <a class="blog_post_title">
                            {{ $value['fullname'] }}
                        </a>
                        <ul class="blog_post_info">
                            <li>
                                <a href="{{ route('MainPage') }}">
                                    {{ trans('navigation/menu.menu_home')}}
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    {{ trans('navigation/menu.menu_about_us')}}
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('CompanyScope') }}">
                                    {{ trans('navigation/sub_menu.organization_structure') }}
                                </a>
                            </li>
                        </ul>
                        <hr/>
                        <div class="blog_post_content">
                            {!! str_limit($value['description'],240) !!}
                        </div>
                        <a class="read_more_btn" href="#">
                            {{ trans('global_page.global_page_lable_link_cta') }} 
                        </a>
                    </div>
                </div>
                @endforeach
            @endif
            </div>
            <div class="col-md-3 padbot50">
                <div class="sidepanel widget_meta">
                    <ul>
                        <li>
                            <a href="{{ route('CompanyHistory') }}">
                                {{ trans('navigation/sub_menu.lintas_history') }}
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('CompanyVisionMission') }}">
                                {{ trans('navigation/sub_menu.vision_mission') }}
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('CompanyOrganization') }}">
                                {{ trans('navigation/sub_menu.organization_structure') }}
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('CompanyScope') }}">
                                {{ trans('navigation/sub_menu.lintas_scope') }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection