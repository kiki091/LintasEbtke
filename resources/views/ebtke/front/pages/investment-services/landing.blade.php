@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }} Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }} Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }} Kementerian ESDM Republik Indonesia" />
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
            <!--
               ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
              |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
               | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
               | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
              |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

            -->
            <div class="col-md-12">
            @if(isset($investment_services) && !empty($investment_services))
                @foreach($investment_services as $key=> $value)
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
                                <a href="{{ route('InvestmentServicesLanding') }}">
                                    {{ trans('navigation/menu.menu_investment_services')}}
                                </a>
                            </li>
                        </ul>
                        <hr/>
                        <div class="blog_post_content">
                            {!! str_limit($value['introduction'],240) !!}
                        </div>
                        <a class="read_more_btn" href="{{ route('InvestmentServicesDetail',$value['slug']) }}">
                            {{ trans('global_page.global_page_lable_link_cta') }} 
                        </a>
                    </div>
                </div>
                @endforeach
            @endif
            </div>
        </div>
    </div>
</section>
@endsection