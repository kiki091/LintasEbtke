<div id="app">
	<div class="bg__gray">
		<div class="page-title">
			<div class="title_left">
		        <h3>COMPANY HISTORY </h3>
		        <p>CONTENT MANAGEMENT SYSTEM</p>
		    </div>
		</div>
	</div>
    
    <div class="col-md-12 col-sm-12 col-xs-12">
    	<!-- Include form -->
    	@include('ebtke.cms.pages.company.history.partials.form')
    	@include('ebtke.cms.pages.company.history.partials.form-banner')
    	<!-- / End include form -->

    	<!-- Main Banner -->
    	<div class="main__content__layer">
			<div class="content__top flex-between">
				<div class="content__title">
					<h2>@{{ form_add_title_banner }}</h2>
				</div>
		    </div>
		    <div class="content__bottom">
		    	<ul class="news__list sortable" id="sort" v-sort>
		    		<li class="news__list__wrapper sort-item" v-for="main_banner in responseData.main_banner" :data-id="main_banner.id">
		    			<div class="news__list__detail">
		    				<div class="drag__control">
								<div class="handle">
									@include('ebtke.cms.svg-logo.ico-handle-drag')
								</div>
							</div>
							<div class="news__list__detail__left">
								<img :src=main_banner.filename_url>
							</div>
							<div class="news__list__detail__middle-right">
								<div class="news__list__detail__middle">
									<div class="news__list__desc">
										<div class="news__name">
											<a href="#edit-data" class="title__name content__edit__hover" title="Edit Data" @click="editBanner(main_banner.id)">
												@{{ main_banner.title }}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
    	<!-- End Main Banner -->

		<div class="main__content__layer">
			<div class="content__top flex-between">
				<div class="content__title">
					<h2>@{{ form_add_title }}</h2>
				</div>
		    </div>
		    <div class="content__bottom">
		    	<ul class="news__list sortable" id="sort" v-sort>
		    		<li class="news__list__wrapper sort-item" v-for="company_history in responseData.company_history" :data-id="company_history.id">
		    			<div class="news__list__detail">
		    				<div class="drag__control">
								<div class="handle">
									@include('ebtke.cms.svg-logo.ico-handle-drag')
								</div>
							</div>
							<div class="news__list__detail__middle-right">
								<div class="news__list__detail__middle">
									<div class="news__list__desc">
										<div class="news__name">
											<a href="#edit-data" class="title__name content__edit__hover" title="Edit Data" @click="editData(company_history.id)">
												@{{ company_history.title }}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

    </div>
</div>
