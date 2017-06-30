<form action="#" method="POST" id="UserAccountManagementFrom" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none; margin-top: 5%;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title"><h2>@{{ form_add_title }}</h2></div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel">Cancel</a>
				</div>
			</div>
			<div class="form--mid">
				<div class="create__form content__tab active__content">
					<div class="form__group__row">
						<div id="form-accordion">
							<div class="create__form__row">
								<span class="form__group__title">General Information</span>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Office Name</label>
									<div class="field__icon">
										<input name="office_name" type="text" id="office_name" class="form-control" placeholder="Enter here">
									</div>
									<div class="form--error--message" id="form--error--message--title"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Office Name</label>
									<div class="field__icon">
										<div class="checkbox icheck-wetasphalt">
										    <input type="checkbox" checked>

										</div>
									</div>
									<div class="form--error--message" id="form--error--message--title"></div>
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
							<input v-model="models.id" type="hidden" name="id">
							<button class="btn__form" type="submit">Save</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</form>
