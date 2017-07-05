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
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Slug <b>@{{ supportedLang.name }}</b></label>
									<input :value="models.title[supportedLangKey] | lowercase | strSlug" :name="'slug['+supportedLangKey+']'" type="text" :id="'slug['+supportedLangKey+']'" class="new__form__input__field" placeholder="Enter the slug here" readonly="readonly">
									<div class="form--error--message--left" :id="'form--error--message--slug_'+supportedLangKey"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Tags</label>
									<select name="tag_id" v-model="models.tag_id">
										<option value="">Select Tags</option>
										<option v-for="tags in responseData.tags" v-bind:value="tags.id">@{{ tags.title }}</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--tag_id"></div>
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

							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey) && edit == false" >
								<div class="new__form__field " style="width: 500px;">
									<label>Slider Image</label>
									<div class="form__photo__uploader single__image">
										<small>Drop <span><b>Main image</b></span> in this area. Sort images by "draging and droping" in the desired position</small>
										<div class="form__photo__uploader__wrapper flex flex-align-center">
											<ul class="form__photo__uploader__ul photo-sortable" >

												<!-- card upload -->
												<li class="form__photo__uploader__li" v-for="(detailImage, index) in default_total_detail_image">
													<div class="form__photo__handle handle">
														@include('ebtke.cms.svg-logo.ico-handle-drag')
													</div>
													<div class="form__photo__group">
														<div class="form__photo__right">
															<div class="upload__img" v-bind:class="{hide__element: filename[index]}">
																<input :name="'filename['+index+']'" class="upload__img__input" type="file" :id="'filename_'+index" @change="onImageSliderChange('filename', index, $event)">
																<label :for="'filename_'+index" class="upload__img__label"></label>
															</div>
															<div class="upload__img" v-bind:class="{hide__element: !filename[index]}">
																<img class="upload__img__preview" :src="filename[index]" />
																<a href="javascript:void(0);" class="upload__img__show__preview" id="img-preview" @click="previewImage(filename[index])">&times;</a>
																<button class="upload__img__remove" @click="removeImageSlider('filename', index)" v-if="edit == false">&times;</button>
															</div>
															<span class="form__photo__title">Images Slider</span>
														</div>
													</div>
													<a href="javascript:void(0);" class="form__photo__remove" @click="removeImageWrapper(index)">&times;</a>
												</li>
											</ul>

											<!-- POPUP UPLOAD PREVIEW LARGE -->
											<a href="javascript:void(0);" class="form__photo__placeholder" id="add-card-photo-uploader-en" @click="addMoreImageSlider" v-if="default_total_detail_image.length != 4"><i>&plus;</i><span>Add New</span></a>
										</div>
										<div class="image__upload__preview__wrapper">
											<div class="img__preview__overlay" id="img-preview-popup">
												<div class="img__preview__popup">
													<div class="img__preview__popup__wrapper">
														<a href="javascript:void(0);" class="img__preview__big__close">&times;</a>
														<img class="upload__img__preview__big" :src="image_big_preview" />
													</div>
												</div>
											</div>
										</div>
										<small><span>Upload Tip: </span>Please upload high resolution photo only with format of *jpeg. <br />(<b>Mobile</b> With Dimension: {{ NEWS_IMAGES_WIDTH }} x {{ NEWS_IMAGES_HEIGHT }} pixels)</small>
									</div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Introduction <b>(@{{ supportedLang.name }})</b></label>
										<textarea v-model="models.introduction[supportedLangKey]" :name="'introduction['+supportedLangKey+']'" class="ckeditor" :id="'editor-'+supportedLangKey+'-1'"></textarea>
										<div class="form--error--message" id="form--error--message--introduction_@{{supportedLangKey}}"></div>
									</div>
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
										<div class="form--error--message" :id="'form--error--message--meta_title_'+supportedLangKey"></div>
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