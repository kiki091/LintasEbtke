<form action="{{ route('CmsUserAccountStoreData') }}" method="POST" id="UserAccountManagementFrom" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none; margin-top: 5%;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title"><h2>@{{ form_add_title }}</h2></div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="resetForm">Cancel</a>
				</div>
			</div>
			<div class="form--mid">
				<div class="create__form content__tab active__content">
					<div class="form__group__row">
						<div id="form-accordion">
							<div class="create__form__row">
								<span class="form__group__title">General Information<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-1"><i>@include('ebtke.cms.svg-logo.ico-expand-arrow')</i></a></span>
							</div>
							<div id="form-accordion-1" style="display: block;">
								<div class="create__form__row">
									<div class="new__form__field">
										<label>Name</label>
										<div class="field__icon">
											<input v-model="models.name" name="name" type="text" id="name" class="form-control" placeholder="Enter here">
										</div>
										<div class="form--error--message--left" id="form--error--message--name"></div>
									</div>
								</div>
								<div class="create__form__row">
									<div class="new__form__field">
										<label>Email</label>
										<div class="field__icon">
											<input v-model="models.email" name="email" type="email" id="email" class="form-control" placeholder="Enter here">
										</div>
										<div class="form--error--message--left" id="form--error--message--email"></div>
									</div>
								</div>
								<div class="create__form__row">
									<div class="new__form__field">
										<label>Password</label>
										<div class="field__icon">
											<input v-model="models.password" name="password" type="password" id="password" class="form-control" placeholder="Enter here">
										</div>
										<div class="form--error--message--left" id="form--error--message--password"></div>
									</div>
								</div>
								<div class="create__form__row">
									<div class="new__form__field">
										<label>Confirm Password</label>
										<div class="field__icon">
											<input v-model="models.confirm_password" name="confirm_password" type="password" id="confirm_password" class="form-control" placeholder="Enter here">
										</div>
										<div class="form--error--message--left" id="form--error--message--confirm_password"></div>
									</div>
								</div>
								<hr/>
							</div>
							<div class="create__form__row">
								<span class="form__group__title">User Access Control<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-2"><i>@include('ebtke.cms.svg-logo.ico-expand-arrow')</i></a></span>
							</div>
							<div id="form-accordion-2" style="display: block;">
								<div class="create__form__row">
									<div class="new__form__field full-width">
										<label>Location Access</label>
										<ul class="to_do">
											<li>
												<div class="radio icheck-primary">
	    											<input v-model="models.location_id" type="radio" v-bind:value="1" name="location_id" id="location_id_user" />
												    <label for="location_id_user">USER</label>
												</div>
											</li>
											<li>
												<div class="radio icheck-primary">
	    											<input v-model="models.location_id" type="radio" v-bind:value="2" name="location_id" id="location_id_admin" />
												    <label for="location_id_admin">ADMIN</label>
												</div>
											</li>
										</ul>
										<div class="form--error--message--left" id="form--error--message--location_id"></div>
									</div>
								</div>
								<div class="create__form__row">
									<div class="new__form__field" style="width: 100%">
										<label>System Access</label>
										
										<div class="field__icon">
											<div class="">
												<ul class="to_do">
													<li v-for="system_location in responseData.system_location">
														<p>
															<div class="checkbox icheck-primary">
															    <input class="checkbox__data" type="checkbox" name="system_id[]" :id=" 'checkbox-system_id-' + system_location.system_id" :value="system_location.system_id"/>
															    <label :for=" 'checkbox-system_id-' + system_location.system_id">@{{ system_location.name }}</label>
															</div>
														</p>
													</li>
												</ul>
											</div>
										</div>
										<div class="form--error--message--left" id="form--error--message--system_id"></div>
									</div>
								</div>
								<div class="create__form__row">
									<div class="new__form__field full-width">
										<label>Privilage Access</label>
										<ul class="to_do">
											<li v-for="user_privilage in responseData.user_role">
												<div class="radio icheck-primary">
	    											<input class="checkbox__data" type="radio" v-bind:value="user_privilage.privilage_id" name="privilage_id" :id=" 'privilage_id_' + user_privilage.privilage_id" />
												    <label :for=" 'privilage_id_' + user_privilage.privilage_id">
												    	@{{ user_privilage.display_name }}
												    </label>
												</div>
											</li>
										</ul>
										<div class="form--error--message--left" id="form--error--message--privilage_id"></div>
									</div>
								</div>
								<div class="create__form__row">
									<div class="new__form__field" style="width: 100%">
										<label>Navigation Access</label>
										<div class="field__icon">
											<div class="">
												<ul class="to_do">
													<li v-for="user_menu in responseData.menu_navigation">
														<p>
															<div class="checkbox icheck-primary">
															    <input class="checkbox__data" type="checkbox" name="menu_id[]" :id=" 'checkbox-menu_id-' + user_menu.id" :value="user_menu.id"/>
															    <label :for=" 'checkbox-menu_id-' + user_menu.id">@{{ user_menu.title }}</label>
															</div>
														</p>
													</li>
												</ul>
											</div>
										</div>
										<div class="form--error--message--left" id="form--error--message--menu_id"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="form--bot">
				<div class="create__form">
					<div class="create__form__row flex-between">
						<div class="new__form__btn">
							<input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
							<input v-model="models.id" v-if="edit == true" type="hidden" name="id">
							<button class="btn__form" type="submit" @click="storeData">Save</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</form>
