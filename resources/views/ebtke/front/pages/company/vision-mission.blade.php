@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }}| Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }}| Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }}| Kementerian ESDM Republik Indonesia" />
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
    

    <!--
       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

    -->

    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="default-after-content-text">
                    <h1>{{ trans('pages/vision_mision_page.title_vision') }}</h1>
                    <h3>
                        {{ trans('pages/vision_mision_page.sub_title_vision') }}
                    </h3>
                </div>
            </div>
            
        </div>
    </div>

    <div class="container landing-introduction-section">
        <div class="row">
            <div class="col-md-8">
              <h1>{{ trans('pages/vision_mision_page.title_mission') }}
              
              <div class="sidepanel widget_meta">
                <ul>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_mission_1') }}</a>
                  </li>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_mission_2') }}</a>
                  </li>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_mission_3') }}</a>
                  </li>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_mission_4') }}</a>
                  </li>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_mission_5') }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-8">
              <h1>{{ trans('pages/vision_mision_page.title_objective') }}
              
              <div class="sidepanel widget_meta">
                <ul>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_objective_1') }}</a>
                  </li>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_objective_2') }}</a>
                  </li>
                  <li>
                    <a href="">{{ trans('pages/vision_mision_page.description_objective_3') }}</a>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    </div>
</section>

@endsection