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
<section id="desktop">
	<!-- Begin page header-->
    
    <div class="container">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="default-after-banner-text">
                    <h1>
                        DAFTAR AUDITOR ENERGY BERSERTIFIKAT
                    </h1>
                    <h3>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    </h3>
                </div>
            </div>

            <div class="cd-tabs col-md-12">
                
                <ul class="cd-tabs-content">
                    <li class="selected">
                        <div id="desktop__content">
                            <div id="desktop-breadcrumb-menu">
                                <a href="{{ route('CertifiedEnergy') }}" class="breadcrumb text-gray">
                                  CERTIFIED ENERGY   
                                </a>
                                <a href="{{ route('EnergyAuditor') }}" class="breadcrumb text-gray">
                                  AUDITOR ENERGY
                                </a>
                            </div>
                        </div>
                        <table cellpadding="0" cellspacing="0" class="table--data-style">
                            <tbody>
                                <tr>
                                    <td class="header">Fullname</td>
                                    <td class="header">Company Name</td>
                                    <td class="header">Province Name</td>
                                    <td class="header">Type Auditor</td>
                                    <td class="header">Years</td>
                                    <td class="header">Sector</td>
                                    <td class="header">Sub Sector</td>
                                </tr>
                                @if(isset($energy_auditor) && !empty($energy_auditor))
                                @foreach($energy_auditor as $key => $energy_auditor)
                                <tr>
                                    <td>{{ $energy_auditor['fullname'] }}</td>
                                    <td>{{ $energy_auditor['company_name'] }}</td>
                                    <td>{{ $energy_auditor['province_name'] }}</td>
                                    <td>{{ $energy_auditor['type_auditor'] }}</td>
                                    <td>{{ $energy_auditor['years'] }}</td>
                                    <td>{{ $energy_auditor['sector'] }}</td>
                                    <td>{{ $energy_auditor['sub_sector'] }}</td>
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