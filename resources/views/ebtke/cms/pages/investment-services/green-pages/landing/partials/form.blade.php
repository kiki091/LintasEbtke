<form action="{{ route('GreenPagesStoreData') }}" method="POST" id="GreenPagesContentManagementFrom" class="form" enctype="multipart/form-data" @submit.prevent>
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
									<label>Category</label>
									<select name="green_pages_category_id" v-model="models.green_pages_category_id">
										<option value="">Select Category</option>
										<option v-for="category in responseData.category" v-bind:value="category.id">@{{ category.title }}</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--green_pages_category_id"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Office Name</label>
									<input v-model="models.office_name" :name="'office_name'" type="text" id="office_name" class="new__form__input__field" placeholder="Enter the office name here">
									<div class="form--error--message--left" id="form--error--message--office_name"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Phone Number</label>
									<input v-model="models.phone_number" :name="'phone_number'" type="text" id="phone_number" class="new__form__input__field" placeholder="Enter the office name here">
									<div class="form--error--message--left" id="form--error--message--phone_number"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Fax Number</label>
									<input v-model="models.fax_number" :name="'fax_number'" type="text" id="fax_number" class="new__form__input__field" placeholder="Enter the office name here">
									<div class="form--error--message--left" id="form--error--message--fax_number"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Email</label>
									<input v-model="models.email" :name="'email'" type="email" id="email" class="new__form__input__field" placeholder="Enter the office name here">
									<div class="form--error--message--left" id="form--error--message--email"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Postal Code</label>
									<input v-model="models.postal_code" :name="'postal_code'" type="text" id="postal_code" class="new__form__input__field" placeholder="Enter the office name here">
									<div class="form--error--message--left" id="form--error--message--postal_code"></div>
								</div>
							</div>
							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Website</label>
									<input v-model="models.website" :name="'website'" type="url" id="website" class="new__form__input__field" placeholder="Enter the office name here">
									<div class="form--error--message--left" id="form--error--message--website"></div>
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
										<small><span>Upload Tip: </span>Please upload high resolution photo only with format of *jpeg. <br />(<b>Desktop</b> With Dimension: {{ EVENT_IMAGES_WIDTH }} x {{ EVENT_IMAGES_HEIGHT }} pixels)</small>
									</div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Address <b>(@{{ supportedLang.name }})</b></label>
										<textarea v-model="models.address[supportedLangKey]" :name="'address['+supportedLangKey+']'" class="ckeditor" :id="'editor-'+supportedLangKey+'-1'"></textarea>
										<div class="form--error--message" :id="'form--error--message--address_'+supportedLangKey"></div>
									</div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Introduction <b>(@{{ supportedLang.name }})</b></label>
										<textarea v-model="models.introduction[supportedLangKey]" :name="'introduction['+supportedLangKey+']'" class="ckeditor" :id="'editor-'+supportedLangKey+'-2'"></textarea>
										<div class="form--error--message" :id="'form--error--message--introduction_'+supportedLangKey"></div>
									</div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Description <b>(@{{ supportedLang.name }})</b></label>
										<textarea v-model="models.description[supportedLangKey]" :name="'description['+supportedLangKey+']'" class="ckeditor" :id="'editor-'+supportedLangKey+'-3'"></textarea>
										<div class="form--error--message" :id="'form--error--message--description_'+supportedLangKey"></div>
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