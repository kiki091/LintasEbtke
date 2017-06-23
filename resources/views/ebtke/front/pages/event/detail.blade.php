@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail_event['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $detail_event['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $detail_event['meta_description'] or '' }}" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

@if(isset($detail_event) && !empty($detail_event))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container detail--header default-large-banner-section">
        <div class="row">
            <div id="desktop__content">
                <a href="{{ route('MainPage') }}" class="breadcrumb text-gray">
                    {{ trans('navigation/menu.menu_home')}}         
                </a>
                <a href="{{ route('landingEvent') }}" class="breadcrumb text-gray">
                    {{ trans('navigation/sub_menu.events')}}
                </a>
                <a href="{{ route('detailEvent',$detail_event['slug']) }}" class="breadcrumb text-gray">{{ $detail_event['title'] or '' }}</a>
            </div>
            <div class="col-md-12">
                  <h3 class="latestnews__title text-center">
                      {{ $detail_event['title'] or '' }}
                  </h3>
            </div>
            <!--
               ____    _    _   _ _   _ _____ ____
              | __ )  / \  | \ | | \ | | ____|  _ \
              |  _ \ / _ \ |  \| |  \| |  _| | |_) |
              | |_) / ___ \| |\  | |\  | |___|  _ <
              |____/_/   \_\_| \_|_| \_|_____|_| \_\

            -->
            <div class="col-md-12">
                <div class="w3-content w3-display-container">
                    <img class="mySlides" src="{{ $detail_event['thumbnail_url'] or '' }}" style="width:100%">

                    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                    <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                </div>
            </div>

            
        </div>
    </div>
    <div class="container style--texteditor">

        <div class="default-content">
            {!! $detail_event['introduction'] or '' !!}
            {!! $detail_event['description'] or '' !!}
        
        </div>
    </div>
</section>
@endif

@if(isset($detail_event['related']) && !empty($detail_event['related']))

<!-- 
      _    _     ____   ___    _     ___ _  _______ 
     / \  | |   / ___| / _ \  | |   |_ _| |/ / ____|
    / _ \ | |   \___ \| | | | | |    | || ' /|  _|  
   / ___ \| |___ ___) | |_| | | |___ | || . \| |___ 
  /_/   \_\_____|____/ \___/  |_____|___|_|\_\_____|
                                                    
-->
<section id="desktop__content">
    <!-- Begin page header-->
    <div class="container">
        <hr/>
        <div class="detail-also-like-title">
            <h1>You might also like</h1>
        </div>
        @foreach($detail_event['related'] as $key=> $related)
        
        <div id="related__news" class="col-md-4">
            <img src="{{ $related['related_thumbnail_url'] }}" class="img-responsive">
            <p>
                <a href="{{ route('detailEvent',$related['related_slug']) }}">
                    <h4>{{ $related['related_title'] }}</h4>
                </a>
            </p>
            <ul>
                <li>{{ $related['related_day_ago'] }}</li>
                <li>{{ $related['related_view'] }} Views</li>
            </ul>
        </div>
        @endforeach
    </div>
</section>

<!-- 

    __  _______  ____  ______    ______   _    ____________  _____ ________  _   __
   /  |/  / __ \/ __ )/  _/ /   / ____/  | |  / / ____/ __ \/ ___//  _/ __ \/ | / /
  / /|_/ / / / / __  |/ // /   / __/     | | / / __/ / /_/ /\__ \ / // / / /  |/ / 
 / /  / / /_/ / /_/ // // /___/ /___     | |/ / /___/ _, _/___/ // // /_/ / /|  /  
/_/  /_/\____/_____/___/_____/_____/     |___/_____/_/ |_|/____/___/\____/_/ |_/   
                                                                                   

 -->

<section id="mobile__content">
  <div class="col-md-12">
    <div class="row">
      <button class="accordion">{{ trans('global_page.you_migh_also_like') }}</button>
      <div class="panel">
          @foreach($detail_event['related'] as $key=> $related)
        
              <div id="related__news" class="col-md-4">
                  <img src="{{ $related['related_thumbnail_url'] }}" class="img-responsive">
                  <p>
                      <a href="{{ route('detailEvent',$related['related_slug']) }}">
                          <h4>{{ $related['related_title'] }}</h4>
                      </a>
                  </p>
                  @if(isset($related['related_day_ago']) && !empty($related['related_day_ago']))
                  <ul>
                      <li>{{ $related['related_day_ago'] }}</li>
                      <li>{{ $related['related_view'] }} Views</li>
                  </ul>
                  @endif
              </div>
          @endforeach
      </div>
    </div>
  </div>
</section>

@endif

@endsection