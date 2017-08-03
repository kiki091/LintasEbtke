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
            <div class="col-md-6 wow fadeInDown" data-wow-delay="1s">
                <div class="default-after-content-text">
                    <h1>{{ trans('pages/vision_mision_page.title') }}</h1>
                    <h3>
                        {{ trans('pages/vision_mision_page.introduction') }}
                    </h3>
                    <hr/>
                </div>
            </div>
            
        </div>
    </div>
    <div class="container">
        <div class="row">
        <div class="col-md-4 wow fadeInLeft" data-wow-delay="1s">
              <img class="img-responsive" src="{{ asset('bin/db/images/company/vision-mission/vision-mission.jpg') }}">
        </div>
        <div class="col-md-8 wow fadeInRight" data-wow-delay="0.2s">
              <p>
              <h3>{{ trans('pages/vision_mision_page.title_description_introduction') }}</h3>
              {{ trans('pages/vision_mision_page.description_introduction') }}
              <ul>
                  <li>{!! trans('pages/vision_mision_page.sub_introduction_one') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.sub_introduction_two') !!}</li>
              </ul>
              </p>

              <p>
              <h3>{{ trans('pages/vision_mision_page.title_side_description') }}</h3>
              {{ trans('pages/vision_mision_page.side_description') }}
              <ul>
                  <li>{!! trans('pages/vision_mision_page.side_description_one') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.side_description_two') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.side_description_three') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.side_description_four') !!}</li>
              </ul>
              <hr/>
              </p>
        </div>
        </div>
        <div class="row">
        <div class="col-md-8 wow fadeInLeft" data-wow-delay="0.5s">
              <p>
              <h3>{{ trans('pages/vision_mision_page.title_function_description') }}</h3>
              {{ trans('pages/vision_mision_page.function_description') }}
              </p>
              <p>
              <h3>{{ trans('pages/vision_mision_page.title_commitment') }}</h3>
              {{ trans('pages/vision_mision_page.commitment_description') }}
              <hr/>
              </p>
        </div>
        <div class="col-md-4 wow fadeInRight" data-wow-delay="0.5s">
              <img class="img-responsive" src="{{ asset('bin/db/images/company/vision-mission/commitment.jpg') }}">
        </div>
        </div>
        <div class="row">
        <div class="col-md-4 wow fadeInLeft" data-wow-delay="0.5s">
              <p>
              <h3>{{ trans('pages/vision_mision_page.title_vision') }}</h3>
              {!! trans('pages/vision_mision_page.sub_title_vision') !!}
              </p>
              
        </div>
        <div class="col-md-4 wow fadeInUp" data-wow-delay="0.3s">
              <img class="img-responsive" src="{{ asset('bin/db/images/company/vision-mission/vision-mission-statement.jpg') }}">
        </div>
        <div class="col-md-4 wow fadeInRight" data-wow-delay="0.5s">
              <p>
              <h3>{{ trans('pages/vision_mision_page.title_mission') }}</h3>
              <ul>
                  <li>{!! trans('pages/vision_mision_page.description_mission_1') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.description_mission_2') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.description_mission_3') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.description_mission_4') !!}</li>
                  <li>{!! trans('pages/vision_mision_page.description_mission_5') !!}</li>
              </ul>
              </p>
        </div>
        </div>
        <div class="row">
        <div class="col-md-12 wow fadeInUp" data-wow-delay="0.3s">
              <p>{!! trans('pages/vision_mision_page.mission_description') !!}</p>
              <hr/>
              <p><h3>{!! trans('pages/vision_mision_page.title_challanges') !!}</h3></p>
              <p>{!! trans('pages/vision_mision_page.description_challanges') !!}</p>
        </div>
        </div>
    </div>
</section>

@endsection