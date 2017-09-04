@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $detail_industri['meta_title'] or '' }} Kementerian ESDM Republik Indonesia
@stop

@section('seo')
    <meta name="keywords" content="{{ $detail_industri['meta_keyword'] or '' }} Kementerian ESDM Republik Indonesia" />
    <meta name="description" content="{{ $detail_industri['meta_description'] or '' }} Kementerian ESDM Republik Indonesia" />
@stop

@section('content')



<!-- 
    ____ ___  _   _ _____ _____ _   _ _____ 
   / ___/ _ \| \ | |_   _| ____| \ | |_   _|
  | |  | | | |  \| | | | |  _| |  \| | | |  
  | |__| |_| | |\  | | | | |___| |\  | | |  
   \____\___/|_| \_| |_| |_____|_| \_| |_|  
                                            
-->

@if(isset($detail_industri) && !empty($detail_industri))
<section id="desktop">
	<!-- Begin page header-->
    <div class="container detail--header default-large-banner-section">
    	<div class="row">
            <div id="desktop__content">
        		    <div id="desktop-breadcrumb-menu" class="col-md-12">
        			      <a href="#" class="breadcrumb text-gray">
                      {{ trans('navigation/menu.menu_information_services')}}   
                    </a>
                    <a href="#" class="breadcrumb text-gray">
                      {{ trans('navigation/sub_menu.renewable_energi')}}
                    </a>
                    <a href="#" class="breadcrumb text-gray">{{ trans('navigation/sub_menu.industry')}}</a>
        		    </div>
            </div>
            <div class="col-md-12">
                  <h3 class="latestnews__title text-center">
                      {{ $detail_industri['title'] or '' }}
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
                    <img class="mySlides" src="{{ $detail_industri['thumbnail_url'] or '' }}" style="width:100%">

                    <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
                    <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
                </div>
            </div>

            
    	</div>
    </div>
    <div class="container">
        <div class="row">
            <div class="cd-tabs col-md-12">
                <nav>
                    <ul class="cd-tabs-navigation">
                        <li>
                            <a data-content="Industri" class="selected" target="_blank" href="javascript:void(0);">
                                Industry
                            </a>
                        </li>
                        <li>
                            <a data-content="CertifiedEnergy" target="_blank" href="javascript:void(0);">
                                Certified Energy
                            </a>
                        </li>
                        <li>
                            <a data-content="EnergyAuditor" target="_blank" href="javascript:void(0);">
                                Energy Auditor
                            </a>
                        </li>
                    </ul> <!-- cd-tabs-navigation -->
                </nav>
                <ul class="cd-tabs-content">
                    <li data-content="Industri" class="selected">
                        <div class="default-content">
                            {!! $detail_industri['description'] or '' !!}
                        
                        </div>
                    </li>
                    <li data-content="CertifiedEnergy">
                        <div class="default-content">
                            <h3>List data Certified Energy</h3>
                            <p>{!! $detail_industri['introduction'] or '' !!}</p>
                        </div>
                        <table cellpadding="0" cellspacing="0" class="table--data-style">
                            <tbody>
                                <tr id="desktop__tabel">
                                    <td class="header">Fullname</td>
                                    <td class="header">Company Name</td>
                                    <td class="header">Province Name</td>
                                    <td class="header">Sector</td>
                                    <td class="header">Sub Sector</td>
                                </tr>
                                <tr id="mobile__tabel">
                                    <td class="header">Company Name</td>
                                    <td class="header">Sector</td>
                                    <td class="header">Sub Sector</td>
                                </tr>
                                @if(isset($certified_energy) && !empty($certified_energy))
                                @foreach($certified_energy as $key => $certified_energy)
                                <tr id="desktop__tabel">
                                    <td>{{ $certified_energy['fullname'] }}</td>
                                    <td>{{ $certified_energy['company_name'] }}</td>
                                    <td>{{ $certified_energy['province_name'] }}</td>
                                    <td>{{ $certified_energy['sector'] }}</td>
                                    <td>{{ $certified_energy['sub_sector'] }}</td>
                                </tr>
                                <tr id="mobile__tabel">
                                    <td>{{ $certified_energy['company_name'] }}</td>
                                    <td>{{ $certified_energy['sector'] }}</td>
                                    <td>{{ $certified_energy['sub_sector'] }}</td>
                                </tr>
                                @endforeach
                                @endif
                            </tbody>
                        </table>
                    </li>
                    <li data-content="EnergyAuditor">
                        <div class="default-content">
                          <h3>List data Energy Auditor</h3>
                        </div>
                        <table cellpadding="0" cellspacing="0" class="table--data-style">
                            <tbody>
                                <tr id="desktop__tabel">
                                    <td class="header">Fullname</td>
                                    <td class="header">Company Name</td>
                                    <td class="header">Province Name</td>
                                    <td class="header">Type Auditor</td>
                                    <td class="header">Years</td>
                                    <td class="header">Sector</td>
                                    <td class="header">Sub Sector</td>
                                </tr>
                                <tr id="mobile__tabel">
                                    <td class="header">Company Name</td>
                                    <td class="header">Type Auditor</td>
                                    <td class="header">Years</td>
                                </tr>
                                @if(isset($energy_auditor) && !empty($energy_auditor))
                                @foreach($energy_auditor as $key => $energy_auditor)
                                <tr id="desktop__tabel">
                                    <td>{{ $energy_auditor['fullname'] }}</td>
                                    <td>{{ $energy_auditor['company_name'] }}</td>
                                    <td>{{ $energy_auditor['province_name'] }}</td>
                                    <td>{{ $energy_auditor['type_auditor'] }}</td>
                                    <td>{{ $energy_auditor['years'] }}</td>
                                    <td>{{ $energy_auditor['sector'] }}</td>
                                    <td>{{ $energy_auditor['sub_sector'] }}</td>
                                </tr>
                                <tr id="mobile__tabel">
                                    <td>{{ $energy_auditor['company_name'] }}</td>
                                    <td>{{ $energy_auditor['type_auditor'] }}</td>
                                    <td>{{ $energy_auditor['years'] }}</td>
                                </tr>
                                @endforeach
                                @endif
                            </tbody>
                        </table>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
@endif


@endsection

@section('scripts')
<script>
    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
      showDivs(slideIndex += n);
    }

    function showDivs(n) {
      var i;
      var x = document.getElementsByClassName("mySlides");
      if (n > x.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = x.length}
      for (i = 0; i < x.length; i++) {
         x[i].style.display = "none";  
      }
      x[slideIndex-1].style.display = "block";  
    }
</script>
@stop