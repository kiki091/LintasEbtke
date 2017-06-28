<!DOCTYPE html>
<html lang="en">
    <head>
        @include('ebtke.cms.partials.header')
    </head>

    <body class="nav-md">
        <div class="container body">

            <div class="main_container">
                <!-- PAGE -->
                @include('ebtke.cms.partials.sidebar')
                @include('ebtke.cms.partials.top-nav')

                <div class="right_col" role="main">
                    @yield('content')
                </div>
            </div>
            @include('ebtke.cms.partials.vars')
            @include('ebtke.cms.partials.js_footer')
        </div>
        <div id="custom_notifications" class="custom-notifications dsp_none">
            <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
            </ul>
            <div class="clearfix"></div>
            <div id="notif-group" class="tabbed_notifications"></div>
        </div>
    </body>
</html>


