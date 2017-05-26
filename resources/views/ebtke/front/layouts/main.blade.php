<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        @include('ebtke.front.partials.head')
    </head>
    <body>
        <div id="wrapper">
            @include('ebtke.front.partials.navigation')
            @yield('content')
            <!-- SECTION FOOTER -->
            @include('ebtke.front.partials.footer')
        </div>
        <script src="{{ asset('themes/front/js/jquery-1.11.2.min.js') }}"></script>
        <script src="{{ asset('themes/front/js/bootstrap.js') }}"></script>
        <script src="{{ asset('themes/front/js/jquery.main.js') }}"></script>
    </body>
</html>
