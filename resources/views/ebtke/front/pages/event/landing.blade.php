@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or 'Kementerian ESDM Republik Indonesia' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or 'Kementerian ESDM Republik Indonesia' }}" />
    <meta name="description" content="{{ $seo['meta_description'] or 'Kementerian ESDM Republik Indonesia' }}" />
@stop

@section('content')
<div class="banner--main-event" style="background-image: url({{ asset(MAIN_BANNER_EVENT_DIRECTORY.'Event-Calendar1.jpg') }});">
    
</div>
<!-- 
      _______    _________   ________   _________    __    _______   ______  ___    ____ 
   / ____/ |  / / ____/ | / /_  __/  / ____/   |  / /   / ____/ | / / __ \/   |  / __ \
  / __/  | | / / __/ /  |/ / / /    / /   / /| | / /   / __/ /  |/ / / / / /| | / /_/ /
 / /___  | |/ / /___/ /|  / / /    / /___/ ___ |/ /___/ /___/ /|  / /_/ / ___ |/ _, _/ 
/_____/  |___/_____/_/ |_/ /_/     \____/_/  |_/_____/_____/_/ |_/_____/_/  |_/_/ |_|  

 -->
<section id="desktop" class="page">
    <div class="container card__container__wrapper">
        <div class="card__container padding20">
            <h5 class="s15 uppercase margin0 brandon medium spacing1">
                {{ trans('pages/event_page.event_calendar_title') }}       
            </h5>
        </div>
        <div class="col-md-7">
            <div class="row">
                <div id='calendar'></div>
            </div>
        </div>
        <div style="display: none;" id="description__event" class="pull-right col-md-4">
            <p id="title__event"></p>
            <div id="introduction__event"></div>
            <p>
                <a id="link_url" class="waves-effect waves-light btn--primary blue uppercase btn-readmore" target="__blank">
                    {{ trans('global_page.global_page_lable_link_cta') }}
                </a>
            </p>
        </div>
    </div>
</section>
<div id="fc_detail"></div>

@endsection

@section('scripts')

    <script type="text/javascript" src="{{ asset('js/pages/calendar.js') }}"></script>
@stop