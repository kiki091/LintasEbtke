<form action="#" method="POST" id="ContactUsManagementFrom" class="form" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="resetForm(true)">Close</a>
				</div>
			</div>
			<!-- FORM WIZARD -->
			<div class="form--mid">

				<!-- LANGUAGE ENGLISH -->
				<div class="create__form">
					<div class="form__group__row">
						<div class="create__form__row">
							<span class="form__group__title">General Information<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-banner'"><i>@include('ebtke.cms.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div id="form-accordion-banner'">
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Fullname</label>
									<input v-model="models.fullname" name="fullname" type="text" id="fullname" class="new__form__input__field" readonly="readonly">
									
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Email</label>
									<input v-model="models.email" name="email" type="text" id="email" class="new__form__input__field" readonly="readonly">
									
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Question</label>
									<input v-model="models.question" name="question" type="text" id="question" class="new__form__input__field" readonly="readonly">
									
								</div>
							</div>
							<div class="create__form__row form--media">
								<div class="new__form__field" style="width: 500px;">
									<label>Message</label>
									<textarea v-model="models.message" name="message" id="message" style="margin: 0px; width: 500px; height: 125px;" readonly="readonly"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>