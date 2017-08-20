<div id="app">
	<div class="bg__gray">
		<div class="page-title">
			<div class="title_left">
		        <h3>INDUSTRY CONTENT </h3>
		        <p>CONTENT MANAGEMENT SYSTEM</p>
		    </div>
		</div>
	</div>
    <div v-if="showModal == true" class="popup__mask__alert">
        <div class="popup__wrapper__alert">
            <div class="popup__layer__alert">
                <div class="alert__message__wrapper">
                    <div class="alert__message">
                        <img src="{{ asset('themes/ebtke/cms/images/logo-alert.png') }}" alt="">
                        <h3>Alert!</h3>
                        <label>Are you sure that you want to delete this?</label>
                    </div>
                    <div class="alert__message__btn">
                        <div class="new__form__btn">
                            <a href="#" class="btn__form__reset" @click.prevent="closeDeleteModal">Cancel</a>
                            <a href="#" class="btn__form__create" @click="deleteData(delete_payload.id)">Confirm</a>
                        </div>
                    </div>
                    <button class="alert__message__close" @click.prevent="closeDeleteModal"></button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-md-12 col-sm-12 col-xs-12">
    	<!-- Include form -->
    	@include('ebtke.cms.pages.information-services.renewable-energy.industry.folder')
    	@include('ebtke.cms.pages.information-services.renewable-energy.industry.partials.form')
    	<!-- / End include form -->
		<div class="main__content__layer">
			<div class="content__top flex-between">
				<div class="content__title">
					<h2>@{{ form_add_title }}</h2>
				</div>
				<div class="content__btn">
					<a href="#" class="btn__add" id="toggle-form">Add Industry</a>
		       	</div>
		    </div>
		    <div class="content__bottom">
		    	<ul class="news__list sortable" id="sort" v-sort>
		    		<li class="news__list__wrapper sort-item" v-for="industry in responseData.industry" :data-id="industry.id">
		    			<div class="news__list__detail">
		    				<div class="drag__control">
								<div class="handle">
									@include('ebtke.cms.svg-logo.ico-handle-drag')
								</div>
							</div>
							<div class="news__list__detail__left">
								<img :src=industry.thumbnail_url>
							</div>
							<div class="news__list__detail__middle-right">
								<div class="news__list__detail__middle">
									<div class="news__list__desc">
										<div class="news__name">
											<a href="#edit-data" class="title__name content__edit__hover" title="Edit Data" @click="editData(industry.id)">
												@{{ industry.title }}
											</a>
										</div>
									</div>
								</div>
								<div class="news__list__detail__right">
									<label class="switch">
										<input class="switch-input" id="check_1" type="checkbox" :checked="industry.is_active == true" @change="changeStatus(industry.id)"/>
                                    	<span class="switch-label" data-on="Active" data-off="Inactive"></span> <span class="switch-handle"></span>
									</label>
									<a href="#" class="btn__delete" @click="showDeleteModal(industry.id)">
                                        <i class="fa fa-trash fa-lg"></i>
                                    </a>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

    </div>
</div>
