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
            @include('ebtke.cms.partials.js_footer')
            
    </body>
</html>


