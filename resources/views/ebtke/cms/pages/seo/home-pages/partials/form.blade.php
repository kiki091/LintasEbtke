<form action="{{ route('SeoHomePageStoreData') }}" method="POST" id="SeoHomePageManagementFrom" class="form" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="clearCkEditor">Cancel</a>
				</div>
			</div>
			<!-- FORM WIZARD -->
			<div class="wizard--tab" id="menu">
                <ul class="wizard--tab--ul" >
                    <li class="wizard--tab--li" v-for="(supportedLang, supportedLangKey, index) in supported_language" :class="last_language_key == supportedLangKey? 'lastTab': ( !index ? 'firstTab active__tab' : 'inactive__tab')">
                        <a :href="'#lang-'+supportedLangKey" class="wizard--tab--link">@{{ supportedLang.name }}</a>
                    </li>
                </ul>
            </div>
			<div class="form--mid">

				<!-- LANGUAGE ENGLISH -->
				<div class="create__form content__tab" v-for="(supportedLang, supportedLangKey, index) in supported_language" :class="!index ? 'active__content' : ''" :id="'lang-'+supportedLangKey">
					<div class="form__group__row">
						<div class="create__form__row">
							<span class="form__group__title">Seo Information<a href="javascript:void(0);" class="style__accordion" :data-accordion="'form-accordion-'+supportedLangKey+'-1'"><i>@include('ebtke.cms.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div :id="'form-accordion-'+supportedLangKey+'-1'">
							<div class="create__form__row form--media">
								<div class="new__form__field" style="width: 500px;">
									<label>Meta Title</label>
									<input v-model="models.meta_title[supportedLangKey]" :name="'meta_title['+supportedLangKey+']'" type="text" :id="'meta_title['+supportedLangKey+']'" class="new__form__input__field" placeholder="Meta Title">
									<div class="form--error--message" :id="'form--error--message--meta_title_'+supportedLangKey"></div>
								</div>
							</div>
							<div class="create__form__row form--media">
								<div class="new__form__field" style="width: 500px;">
									<label>Meta Description</label>
									<textarea v-model="models.meta_description[supportedLangKey]" :name="'meta_description['+supportedLangKey+']'" :id="'meta_description['+supportedLangKey+']'" style="margin: 0px; width: 500px; height: 125px;"></textarea>
									<div class="form--error--message" :id="'form--error--message--meta_description_'+supportedLangKey"></div>
								</div>
							</div>
							<div class="create__form__row form--media">
								<div class="new__form__field" style="width: 500px;">
									<label>Meta Keyword</label>
									<input v-model="models.meta_keyword[supportedLangKey]" :name="'meta_keyword['+supportedLangKey+']'" type="text" :id="'meta_keyword['+supportedLangKey+']'" class="new__form__input__field" placeholder="Meta Title">
									<div class="form--error--message" :id="'form--error--message--meta_keyword_'+supportedLangKey"></div>
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
							<input v-model="models.id" type="hidden" name="id" v-if="edit == true">
							<button class="btn__form" type="submit" @click="storeData">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>