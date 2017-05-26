<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="author" content="PT. Asia Resource System">
<title>@yield('pageheadtitle','PT Pupuk Sriwidjaja Palembang (Pusri)')</title>
<meta name="author" content="PT Pupuk Sriwidjaja Palembang (Pusri)" />
<meta name="publisher" content="www.pusri.co.id" />
<meta name="copyright" content="www.pusri.co.id" />
<meta name="host" content="www.pusri.co.id" />
<meta name="geo.position" content="0.18597,117.47865" />    
<meta name="geo.region" content="ID-JB" />
<meta name="geo.country" content="ID"/>
<meta name="geo.placename" content="Palembang, Indonesia" />
<meta name="ICBM" content="0.18597,117.47865" />    
<meta name="DC.title" content="Pt Pupuk Sriwidjaja Palembang (pusri)" />
<meta Http-Equiv="Cache-Control" Content="no-cache">
<meta Http-Equiv="Pragma" Content="no-cache">
<meta Http-Equiv="Expires" Content="0">

@section('seo')
	<meta name="title" content="PT Pupuk Sriwidjaja Palembang (Pusri)" />
    <meta name="keywords" content="Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak" />
    <meta name="description" content="PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia" />
@show

<meta content="{{ isset($seo['meta_description']) ? $seo['meta_description'] : '' }}{{ isset($data['meta_description']) ? $data['meta_description'] : '' }}" name="description">
<meta content="{{ isset($seo['meta_keyword']) ? $seo['meta_keyword'] : '' }}{{ isset($data['meta_keyword']) ? $data['meta_keyword'] : '' }}" name="keywords">

<link rel="icon" href="{{ asset('themes/pusri/front/images/favicon.ico') }}"> 

<link href="https://fonts.googleapis.com/css?family=Courgette|Handlee|Philosopher|Slabo+27px|Delius+Unicase" rel="stylesheet">
<link href="{{ asset('themes/pusri/front/css/font-awesome.css') }}" rel="stylesheet">
<link href="{{ asset('themes/pusri/front/build/css/plugins.css') }}" rel="stylesheet">
<script src="{{ asset('themes/pusri/front/build/js/plugins.js') }}"></script>
