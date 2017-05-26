<div class="demo-2">
    <div id="slider" class="sl-slider-wrapper">

		<div class="sl-slider">
			@foreach($main_banner as $key=> $banner)
			<div class="sl-slide bg-1" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2">
				<div class="sl-slide-inner">
					<div>
						<img style="position: absolute; height: 100%;" src="{{ $banner['image_url'] }}">
						<h2>{{ $banner['title'] }}</h2>
						<blockquote>
						<p>{{ $banner['description'] }}</p>
						</blockquote>
					</div>
				</div>
			</div>
	        @endforeach
		</div><!-- /sl-slider -->
		
		<nav id="nav-arrows" class="nav-arrows">
			<span class="nav-arrow-prev">Previous</span>
			<span class="nav-arrow-next">Next</span>
		</nav>

		<nav id="nav-dots" class="nav-dots">
			<span class="nav-dot-current"></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</nav>

	</div><!-- /slider-wrapper -->
</div>