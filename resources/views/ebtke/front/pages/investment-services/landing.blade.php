@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }} | Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }} | Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }} | Kementerian ESDM Republik Indonesia" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

<section id="desktop" class="page" style="min-height: 500px;">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-12">
              <h3 class="latestnews__title text-center">
                  INVESTMENT SERVICES POTENTIALS GEOTHERMAL
              </h3>
  			      <div class="wrapper">
                  <center><div id="map"></div></center>
  	          </div>
    	   </div>
        </div>
    </div>
</section>

@endsection

@section('maps-vector')

<!-- <script>
    $(function(){
        $('#world-map-geothermal').vectorMap({
            map: 'asia_merc',
            backgroundColor: 'transparent',
            regionsSelectable: true,
            zoomOnScroll: false,
            series: {
            regions: [{
                values: gdpData,
                scale: ['#E6F2F0', '#149B7E'],
                
            }]
          },
          onRegionTipShow: function(e, el, code) {
            el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
          }
        });
    });
</script> -->
@endsection