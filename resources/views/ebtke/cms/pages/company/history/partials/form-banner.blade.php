<form action="{{ route('CompanyHistoryStoreBannerImages') }}" method="POST" id="CompanyHistoryBannerImagesFrom" class="form" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-banner-image-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title_banner }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="resetFormBanner(true)">Cancel</a>
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
							<div class="create__form__row" v-for="(supportedLang, supportedLangKey, index) in supported_language">
								<div class="new__form__field">
									<label>Title <b>@{{ supportedLang.name }}</b></label>
									<div class="field__icon">
										<div :class="'field__icon__img ico-flag-'+supportedLangKey"></div>
										<input v-model="banner.title[supportedLangKey]" :name="'title['+supportedLangKey+']'" type="text" :id="'title['+supportedLangKey+']'" class="new__form__input__field" placeholder="Enter the title here">
									</div>
									<div class="form--error--message--left" :id="'form--error--message--title_'+supportedLangKey"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field upload__image">
									<label>Thumbnail Image </label>
									<div class="upload__img" v-bind:class="{hide__element: filename}">
										<input name="filename" class="upload__img__input" type="file" id="filename" @change="onImageChange('filename', $event)">
										<label for="filename" class="upload__img__label"></label>
									</div>
									<div class="upload__img" v-bind:class="{hide__element: !filename}">
										<img class="upload__img__preview" :src="filename" />
										<input type="text" v-model="image" hidden="hidden" />
										<button class="upload__img__remove" @click="removeImage('filename')"></button>
									</div>
									<div class="form--error--message--left" id="form--error--message--filename"></div>
									<!-- upload tip -->
									<div class="upload__tip">
										<span><b>Upload Tip: </b>Please upload high resolution photo only with format of *jpeg. (With maximum width of {{ MAIN_BANNER_WIDTH }} x {{ MAIN_BANNER_HEIGHT }} px on landscape)</span>
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
							<a href="#" class="btn__wizard__prev prev-button" id="" type="submit"></a>
							<a href="#" class="btn__wizard__next next-button" id="" type="submit">Next</a>
						</div>
						<div class="new__form__btn">
							{{ csrf_field() }}
							<input v-model="banner.id" type="hidden" name="id" v-if="edit_banner == true">
							<button class="btn__form" type="submit" @click="storeBanner">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>