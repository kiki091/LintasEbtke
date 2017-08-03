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
	
	@if(isset($main_banner) && !empty($main_banner))
	<div class="default-banner-section visible-md visible-lg">
        <div class="default-banner-image">
            @foreach($main_banner as $key=> $val)
            <div class="image-container image-loaded-version">
                <img src="{{ $val['image_url'] }}">
            </div>
            @endforeach
        </div>
        
    </div>
    @endif

    <div class="container">
    	<div class="row">
    		<!--
		       ___ _   _ _____ ____   ___  ____  _   _  ____ _____ ___ ___  _   _
		      |_ _| \ | |_   _|  _ \ / _ \|  _ \| | | |/ ___|_   _|_ _/ _ \| \ | |
		       | ||  \| | | | | |_) | | | | | | | | | | |     | |  | | | | |  \| |
		       | || |\  | | | |  _ <| |_| | |_| | |_| | |___  | |  | | |_| | |\  |
		      |___|_| \_| |_| |_| \_\\___/|____/ \___/ \____| |_| |___\___/|_| \_|

		    -->
    		<div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="default-after-banner-text">
                    <h1>
                        {{ trans('pages/procedure_page.title_h1') }}
                    </h1>
                    <h3>
                        {{ trans('pages/procedure_page.title_h3') }}
                    </h3>
                </div>
            </div>
            <div class="cd-tabs col-md-12">
                <nav>
                    <ul class="cd-tabs-navigation">
                        <li>
                            <a data-content="BioEnergy" class="selected" href="javascript:void(0);">
                                {{ trans('pages/procedure_page.tab_bio_energi') }}
                            </a>
                        </li>
                        <li>
                            <a data-content="EnergiAir" href="javascript:void(0);">
                                {{ trans('pages/procedure_page.tab_energi_air') }}
                            </a>
                        </li>
                        <li>
                            <a data-content="EnergiSurya" href="javascript:void(0);">
                                {{ trans('pages/procedure_page.tab_energi_surya') }}
                            </a>
                        </li>
                        <li>
                            <a data-content="PanasBumi" href="javascript:void(0);">
                                {{ trans('pages/procedure_page.tab_panas_bumi') }}
                            </a>
                        </li>
                    </ul> <!-- cd-tabs-navigation -->
                </nav>
                <ul class="cd-tabs-content">
                    <li data-content="BioEnergy" class="selected">
                        <h3>
                            {{ trans('pages/procedure_page.bio_energy.title_h3') }}
                        </h3>
                        <h5>
                            {{ trans('pages/procedure_page.bio_energy.title_h5') }}
                        </h5>
                        <hr/>
                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.bio_energy.tag_content_1') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.bio_energy.description_content_1') }}
                                </p>
                            </div>
                        </div>
                        
                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.bio_energy.tag_content_2') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.bio_energy.description_content_2') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.bio_energy.tag_content_3') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.bio_energy.description_content_3') }}
                                </p>
                            </div>
                        </div>


                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.bio_energy.tag_content_4') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.bio_energy.description_content_4') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.bio_energy.tag_content_5') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.bio_energy.description_content_5') }}
                                </p>
                            </div>
                        </div>
                    </li>

                    <li data-content="EnergiAir">
                        <h3>
                            {{ trans('pages/procedure_page.energi_air.title_h3') }}
                        </h3>
                        <h5>
                            {{ trans('pages/procedure_page.energi_air.title_h5') }}
                        </h5>
                        <hr/>
                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_air.tag_content_1') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_air.description_content_1') }}
                                </p>
                            </div>
                        </div>
                        
                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_air.tag_content_2') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_air.description_content_2') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_air.tag_content_3') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_air.description_content_3') }}
                                </p>
                            </div>
                        </div>


                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_air.tag_content_4') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_air.description_content_4') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_air.tag_content_5') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_air.description_content_5') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_air.tag_content_6') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_air.description_content_6') }}
                                </p>
                            </div>
                        </div>

                    </li>

                    <li data-content="EnergiSurya">
                        <h3>
                            {{ trans('pages/procedure_page.energi_surya.title_h3') }}
                        </h3>
                        <h5>
                            {{ trans('pages/procedure_page.energi_surya.title_h5') }}
                        </h5>
                        <hr/>
                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_surya.tag_content_1') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_surya.description_content_1') }}
                                </p>
                            </div>
                        </div>
                        
                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_surya.tag_content_2') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_surya.description_content_2') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_surya.tag_content_3') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_surya.description_content_3') }}
                                </p>
                            </div>
                        </div>


                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_surya.tag_content_4') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_surya.description_content_4') }}
                                </p>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-3 pull-left">
                                <div class="tags">
                                    <div class="tag">
                                        <span>
                                            {{ trans('pages/procedure_page.energi_surya.tag_content_5') }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8 pull-right">
                                <p class="excerpt">
                                    {{ trans('pages/procedure_page.energi_surya.description_content_5') }}
                                </p>
                            </div>
                        </div>
                    </li>

                    <li data-content="PanasBumi">
                        <h3>
                            {{ trans('pages/procedure_page.panas_bumi.title_h3') }}
                        </h3>
                        <h5>
                            {{ trans('pages/procedure_page.panas_bumi.title_h5') }}
                        </h5>
                        <hr/>
                        <div class="block_content">
                            <h3 class="center">
                                {!! trans('pages/procedure_page.panas_bumi.subtitle') !!}
                            </h3>
                            <p class="excerpt">
                                {!! trans('pages/procedure_page.panas_bumi.optional') !!}
                            </p>
                        </div>

                        <div class="block_content">
                            <div class="col-md-4">
                                <div class="arrow_box_left">
                                    {{ trans('pages/procedure_page.panas_bumi.content_left_1') }}
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="arrow_box_bottom">
                                    {{ trans('pages/procedure_page.panas_bumi.content_center_1') }}
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="arrow_box_right">
                                    {{ trans('pages/procedure_page.panas_bumi.content_right_1') }}
                                </div>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-12">
                                <div class="arrow_box_bottom">
                                    {{ trans('pages/procedure_page.panas_bumi.content_center_2') }}
                                </div>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-12">
                                <div class="arrow_box_bottom">
                                    {{ trans('pages/procedure_page.panas_bumi.content_center_3') }}
                                </div>
                            </div>
                        </div>

                        <div class="block_content">
                            <div class="col-md-5">
                                <div class="arrow_box_left">
                                    {{ trans('pages/procedure_page.panas_bumi.content_left_2') }}
                                </div>
                            </div>
                            <div class="col-md-2"></div>
                            <div class="col-md-5">
                                <div class="arrow_box_right">
                                    {{ trans('pages/procedure_page.panas_bumi.content_right_2') }}
                                </div>
                            </div>
                        </div>

                    </li>
                </ul> <!-- cd-tabs-content -->
            </div>
        </div>
    </div>
</section>

@endsection
