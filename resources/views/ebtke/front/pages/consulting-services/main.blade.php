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
<div class="banner--main-event" style="background-image: url({{ asset(BANNER_CONSULTING_SERVICES_DIRECTORY.'consulting-services-banner.jpg') }});">
    
</div>
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
                <div class="default-after-banner-text">
                    <h1>{{ trans('pages/consulting_services.title') }}</h1>
                    <h3>
                        {{ trans('pages/consulting_services.sub_title') }}
                    </h3>
                </div>
                <hr/>
            </div>
        </div>

        <div class="row border__row">
            <div class="col-md-7">
                <img src="{{ asset(BANNER_CONSULTING_SERVICES_DIRECTORY.'customer-services.png') }}" class="img-responsive" title="Customer Services" />
            </div>
            <div class="col-md-5">
                <div class="customer_services">
                    <h2>{{ trans('pages/consulting_services.title_customer_services') }}</h2>
                    <p>(021) 398300077</p>
                </div>
            </div>
        </div>
        <div class="row border__row">
            <div class="col-md-5">
                <div class="mail_services">
                    <h2>{{ trans('pages/consulting_services.title_email_services') }}</h2>
                    <p>{{ trans('pages/consulting_services.description_email_services') }}</p>
                </div>
                <div class="mail_to">
                    <p><a href="mailto:lintas@ebtke.esdm.go.id">lintas@ebtke.esdm.go.id</a></p>
                </div>
                <p class="information_services">{{ trans('pages/consulting_services.information_services') }}</p>
            </div>

            <div class="col-md-7">
                <img src="{{ asset(BANNER_CONSULTING_SERVICES_DIRECTORY.'email-services.png') }}" class="img-responsive" title="Email Services" />
            </div>
        </div>
    </div>
</section>

@endsection