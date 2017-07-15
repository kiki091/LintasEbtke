<form action="{{ route('ToolsStoreData') }}" method="POST" id="ToolsContentManagementFrom" class="form" enctype="multipart/form-data" @submit.prevent>
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
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Filename</label>
									<input v-model="models.filename" name="filename" type="text" id="filename" class="new__form__input__field" placeholder="Enter the filename here">

									<div class="form--error--message--left" id="form--error--message--filename"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Slug</label>
									<input :value="models.filename | lowercase | strSlug" name="slug" type="text" id="slug" class="new__form__input__field" placeholder="Enter the slug here" readonly="readonly">
									<div class="form--error--message--left" id="form--error--message--slug"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Version</label>
									<input v-model="models.version" name="version" type="text" id="version" class="new__form__input__field" placeholder="Enter the version here">

									<div class="form--error--message--left" id="form--error--message--version"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Country</label>
									<input v-model="models.country" name="country" type="text" id="country" class="new__form__input__field" placeholder="Enter the country here">

									<div class="form--error--message--left" id="form--error--message--country"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Tools Type</label>
									<input v-model="models.tools_type" name="tools_type" type="text" id="tools_type" class="new__form__input__field" placeholder="Enter the tools_type here">

									<div class="form--error--message--left" id="form--error--message--tools_type"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Platform</label>
									<input v-model="models.platform" name="platform" type="text" id="platform" class="new__form__input__field" placeholder="Enter the platform here">

									<div class="form--error--message--left" id="form--error--message--platform"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Manufacture</label>
									<input v-model="models.manufacture" name="manufacture" type="text" id="manufacture" class="new__form__input__field" placeholder="Enter the manufacture here">

									<div class="form--error--message--left" id="form--error--message--manufacture"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Manufacture</label>
									<input v-model="models.manufacture" name="manufacture" type="text" id="manufacture" class="new__form__input__field" placeholder="Enter the manufacture here">

									<div class="form--error--message--left" id="form--error--message--manufacture"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Url</label>
									<input v-model="models.url" name="url" type="text" id="url" class="new__form__input__field" placeholder="Enter the url here">

									<div class="form--error--message--left" id="form--error--message--url"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>File Size</label>
									<input v-model="models.file_size" name="file_size" type="text" id="file_size" class="new__form__input__field" placeholder="Enter the file size here">

									<div class="form--error--message--left" id="form--error--message--file_size"></div>
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
										<span><b>Upload Tip: </b>Please upload high resolution photo only with format of *jpeg. (With maximum width of {{ TOOLS_THUMBNAIL_WIDTH }} x {{ TOOLS_THUMBNAIL_HEIGHT }} px)</span>
									</div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Description <b>(@{{ supportedLang.name }})</b></label>
										<textarea v-model="models.description[supportedLangKey]" :name="'description['+supportedLangKey+']'" class="ckeditor" :id="'editor-'+supportedLangKey+'-1'"></textarea>
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