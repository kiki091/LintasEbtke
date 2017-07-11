<form action="{{ route('WhitePapersStoreData') }}" method="POST" id="WhitePapersContentManagementFrom" class="form" enctype="multipart/form-data" @submit.prevent>
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
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Slug <b>@{{ supportedLang.name }}</b></label>
									<input :value="models.title[supportedLangKey] | lowercase | strSlug" :name="'slug['+supportedLangKey+']'" type="text" :id="'slug['+supportedLangKey+']'" class="new__form__input__field" placeholder="Enter the slug here" readonly="readonly">
									<div class="form--error--message--left" :id="'form--error--message--slug_'+supportedLangKey"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field upload__image">
									<label>Thumbnail Image </label>
									<div class="upload__img" v-bind:class="{hide__element: thumbnail}">
										<input name="thumbnail" class="upload__img__input" type="file" id="thumbnail" @change="onImageChange('thumbnail', $event)">
										<label for="thumbnail" class="upload__img__label"></label>
									</div>
									<div class="upload__img" v-bind:class="{hide__element: !thumbnail}">
										<img class="upload__img__preview" :src="thumbnail" />
										<input type="text" v-model="image" hidden="hidden" />
										<button class="upload__img__remove" @click="removeImage('thumbnail')"></button>
									</div>
									<div class="form--error--message--left" id="form--error--message--thumbnail"></div>
									<!-- upload tip -->
									<div class="upload__tip">
										<span><b>Upload Tip: </b>Please upload high resolution photo only with format of *jpeg. (With maximum width of {{ NEWS_THUMBNAIL_WIDTH }} x {{ NEWS_THUMBNAIL_HEIGHT }} px on landscape)</span>
									</div>
								</div>
							</div>

							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
                                <div class="new__form__field width-auto upload__image">
                                    <label>Upload Downloadable File</label>
                                    <div class="custom__file__upload">
                                        <input type="file" class="upload__file__input" id="file"  name="file" />
                                        <input type="text" id="upload-file-placeholder" class="upload__file__placeholder" placeholder="No file selected" readonly="readonly" v-if="edit == false">
                                        <input type="text" id="upload-file-placeholder-old" v-model="models.file" class="upload__file__placeholder" placeholder="" readonly="readonly" v-if="edit == true">
                                        <label for="file" class="upload__file__button">CHOOSE FILE</label>
                                    </div>
                                    <div class="form--error--message" id="form--error--message--file"></div>
                                </div>
                            </div>

							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Description <b>(@{{ supportedLang.name }})</b></label>
										<textarea v-model="models.description[supportedLangKey]" :name="'description['+supportedLangKey+']'" class="ckeditor" :id="'editor-'+supportedLangKey+'-2'"></textarea>
										<div class="form--error--message" id="form--error--message--description_@{{supportedLangKey}}"></div>
									</div>
								</div>
							</div>
						</div>

						<hr class="form__line">

						<div class="form__group__row">
							<div class="create__form__row">
								<span class="form__group__title">SEO<a href="javascript:void(0);" class="style__accordion" :data-accordion="'form-accordion-'+supportedLangKey+'-seo'"><i>@include('ebtke.cms.svg-logo.ico-expand-arrow')</i></a></span>
							</div>
							<div :id="'form-accordion-'+supportedLangKey+'-seo'">
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
							<input v-model="models.id" type="hidden" name="id" value="@{{ models.id }}" v-if="edit == true">
							<button class="btn__form" type="submit" @click="storeData">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>