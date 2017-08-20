<form action="{{ route('CmsListCertifiedEnergyStoreData') }}" method="POST" id="ListCertifiedEnergyManagementFrom" class="form" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="resetForm">Cancel</a>
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
									<label>Fullname</label>
									
									<input v-model="models.fullname" name="fullname" type="text" id="fullname" class="new__form__input__field" placeholder="Enter the fullname here">

									<div class="form--error--message--left" id="form--error--message--fullname"></div>
								</div>
							</div>

							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Company Name</label>
									
									<input v-model="models.company_name" name="company_name" type="text" id="company_name" class="new__form__input__field" placeholder="Enter the company name here">

									<div class="form--error--message--left" id="form--error--message--company_name"></div>
								</div>
							</div>

							<div class="create__form__row" v-if="showElementByDefaultLang(supportedLangKey)">
								<div class="new__form__field">
									<label>Location</label>
									
									<select name="province_id" v-model="models.province_id" id="province_id">
										<option value="">Select Location</option>
										<option :value="province.id" v-for="province in responseData.province">@{{ province.name }}</option>
									</select>

									<div class="form--error--message--left" id="form--error--message--province_id"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Sector <b>(@{{ supportedLang.name }})</b></label>

										<input v-model="models.sector[supportedLangKey]" :name="'sector['+supportedLangKey+']'" type="text" :id="'sector['+supportedLangKey+']'" class="new__form__input__field" placeholder="Enter the sector here">
										
										<div class="form--error--message" :id="'form--error--message--sector_'+supportedLangKey"></div>
									</div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Sub Sector <b>(@{{ supportedLang.name }})</b></label>
										
										<input v-model="models.sub_sector[supportedLangKey]" :name="'sub_sector['+supportedLangKey+']'" type="text" :id="'sub_sector['+supportedLangKey+']'" class="new__form__input__field" placeholder="Enter the sub sector here">

										<div class="form--error--message" :id="'form--error--message--sub_sector_'+supportedLangKey"></div>
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