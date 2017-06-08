@extends('ebtke.front.layout.master')

@section('pageheadtitle')
    {{ $seo['meta_title'] or '' }}
@stop

@section('seo')
    <meta name="keywords" content="{{ $seo['meta_keyword'] or '' }}" />
    <meta name="description" content="{{ $seo['meta_description'] or '' }}" />
@stop

@section('content')

<!--
   ____    _    _   _ _   _ _____ ____
  | __ )  / \  | \ | | \ | | ____|  _ \
  |  _ \ / _ \ |  \| |  \| |  _| | |_) |
  | |_) / ___ \| |\  | |\  | |___|  _ <
  |____/_/   \_\_| \_|_| \_|_____|_| \_\

-->

<section id="desktop">
	<!-- Begin page header-->
    <div class="container">
    	<div class="row">
    		<div class="col-md-8">
    			<div class="card__container padding20">
    				<h5 class="s15 uppercase margin0 brandon medium spacing1">
                        {{ trans('pages/company_page.title_organization_structure') }}             
                    </h5>
    				<ul class="article">
    					<li class="article--item">
    						<h3 class="semibold margin0">
    							Ir. Rida Mulyana, MSc
    						</h3>
							<img src="" alt="">
							<p class="news">
    							Direktur Jenderal energi baru, terbarukan, dan konservasi energi
    						</p>
    						<div class="center-align">
								<a href="" class="waves-effect waves-light btn--primary blue uppercase btn-readmore">
                                    {{ trans('global_page.global_page_lable_link_cta') }}                         
                                </a>
							</div>
    					</li>
    				</ul>
    			</div>
    		</div>
    	</div>
    </div>
</section>
@endsection