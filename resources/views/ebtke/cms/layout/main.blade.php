<!DOCTYPE html>
<html lang="en">
    <head>
      @include('ebtke.cms.partials.header')
    </head>

    <body class="nav-md fixed">
        <div class="container body">
            <div class="main_container">
                @include('ebtke.cms.sidebar')
                @include('ebtke.cms.top-nav')
                <div class="right_col" role="main">
                    @yield('content')
                </div>
                @include('ebtke.cms.partials.footer')
            </div>
        </div>
        @include('ebtke.cms.partials.js_footer')  
    </body>
</html>


