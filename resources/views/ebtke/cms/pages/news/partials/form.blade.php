<form action="{{ route('CmsNewsStoreData') }}" method="POST" id="NewsContentManagementFrom" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="resetForm">Cancel</a>
				</div>
			</div>
			<!-- FORM WIZARD -->
			<div class="form--wizard--tab" id="box">
				<ul class="wizard--tab--ul" id="menu">
					<li class="wizard--tab--li " v-for="(supportedLang, supportedLangKey, index) in supported_language" v-bind:class="{'firstTab': !index, 'lastTab': supportedLangKey == last_language_key}">
						<a :href="'#lang-'+supportedLangKey" class="wizard--tab--link">@{{ supportedLang.name }}</a>
					</li>
				</ul>
			</div>
			<div class="form--mid">

				<!-- LANGUAGE ENGLISH -->
				<div class="create__form content__tab" v-for="(supportedLang, supportedLangKey, index) in supported_language" :id="'lang-'+supportedLangKey" v-bind:class="{'active__content': !index }">
					<div class="form__group__row">
						<div class="create__form__row">
							<span class="form__group__title">General Information<a href="javascript:void(0);" class="style__accordion" :data-accordion="'form-accordion-'+supportedLangKey+'-1'"><i>@include('ebtke.cms.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div :id="'form-accordion-'+supportedLangKey+'-1'">
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Title <b>@{{ supportedLang.name }}</b></label>
									<div class="field__icon">
										<div :class="'field__icon__img ico-flag-'+supportedLangKey"></div>
										<input v-model="models.title[supportedLangKey]" :name="'title['+supportedLangKey+']'" type="text" :id="'title['+supportedLangKey+']'" class="new__form__input__field" placeholder="Enter the title here">
									</div>
									<div class="form--error--message--left" :id="'form--error--message--title_'+supportedLangKey"></div>
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
							<a href="#" class="btn__wizard__prev" id="prev-button" type="submit"></a>
							<a href="#" class="btn__wizard__next" id="next-button" type="submit">Next</a>
						</div>
						<div class="new__form__btn">
							{{ csrf_field() }}
							<input v-model="models.id" type="hidden" name="id" value="@{{ models.id }}" v-if="edit == true">
							<button class="btn__form" type="submit" @click="storeData">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>