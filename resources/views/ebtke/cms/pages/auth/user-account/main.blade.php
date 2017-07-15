<div id="app">
	<div class="bg__gray">
		<div class="page-title">
			<div class="title_left">
		        <h3>USER ACCOUNT </h3>
		        <p>ACCOUNT MANAGEMENT SYSTEM</p>
		    </div>
		</div>
	</div>
    <div class="col-md-12 col-sm-12 col-xs-12">
    	<!-- Include form -->
    	@include('ebtke.cms.pages.auth.user-account.partials.form')
    	<!-- / End include form -->
		<div class="main__content__layer">
			<div class="content__top flex-between">
				<div class="content__title">
					<h2>@{{ form_add_title }}</h2>
				</div>
				<div class="content__btn">
					<a href="#" class="btn__add" id="toggle-form" @click="showForm">Add User</a>
		       	</div>
		    </div>
		    <div class="content__bottom">
		    	<ul class="news__list sortable" id="sort" v-sort>
		    		<li class="news__list__wrapper sort-item" v-for="user_account in responseData.user_account" :data-id="user_account.id">
		    			<div class="news__list__detail">
		    				<div class="drag__control">
								<div class="handle">
									@include('ebtke.cms.svg-logo.ico-handle-drag')
								</div>
							</div>
							<div class="news__list__detail__left">
								<i style="padding-top: 10px;" class="fa fa-user fa-3x"></i>
							</div>
							<div class="news__list__detail__middle-right">
								<div class="news__list__detail__middle">
									<div class="news__list__desc">
										<div class="news__name">
											<a href="#edit-data" class="title__name content__edit__hover" title="Edit Data" @click="editData(user_account.id)">
												@{{ user_account.email }}
											</a>
										</div>
									</div>
								</div>
								<div class="news__list__detail__right">
									<label class="switch">
										<input class="switch-input" id="check_1" type="checkbox" :checked="user_account.is_active == true" @change="changeStatus(user_account.id)"/>
                                    	<span class="switch-label" data-on="Active" data-off="Inactive"></span> <span class="switch-handle"></span>
									</label>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

    </div>
</div>
