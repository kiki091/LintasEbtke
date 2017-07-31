<form action="#" method="POST" id="CapacityBuildingFrom" class="form" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel">Cancel</a>
				</div>
			</div>
			<div class="form--mid">

				<!-- LANGUAGE ENGLISH -->
				<div class="create__form">
					<div class="form__group__row">
						<div class="create__form__row">
							<span class="form__group__title">General Information<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-1"><i>@include('ebtke.sipeda.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div id="form-accordion-1">
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Nama Proyek IPP</label>
									<input name="topik_kegiatan" type="text" id="topik_kegiatan" class="new__form__input__field" placeholder="Enter the Nama Proyek IPP">
									<div class="form--error--message--left" id="form--error--message--topik_kegiatan"></div>
								</div>
							</div>
						</div>
						<hr/>
						<div class="create__form__row">
							<span class="form__group__title">Information Location<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-2"><i>@include('ebtke.sipeda.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div id="form-accordion-2">
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Provinsi</label>
									<select>
										<option>Nusa Tenggara Timur</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kabupaten</label>
									<select>
										<option>Kupang</option>	
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kecamatan</label>
									<select>
										<option>Kupang Tengah</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Desa</label>
									<select>
										<option>Oelpuah</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
						</div>

						<hr/>
						<div class="create__form__row">
							<span class="form__group__title">More Information<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-3"><i>@include('ebtke.sipeda.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div id="form-accordion-3">
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Jenis Pembangkit</label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the Jenis Pembangkit">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Koordinat (WGS 84)</label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the Koordinat">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kapasitas Terpasang <b>(kW)</b></label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the Kapasitas Terpasang">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Rata-rata Produksi Energi Listrik Tahunan</label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the Rata-rata Produksi Energi Listrik">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sharing Equity</label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the Sharing Equity">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Jenis Energi Primer</label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the Jenis Energi Primer">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>COD</label>
									<input name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the COD">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field full-width">
									<label>Terikat Kontrak</label>
									<ul class="to_do">
										<li>
											<div class="radio icheck-primary">
    											<input class="checkbox__data" type="radio" value="1" name="sertifikasi_kompetensi" id="sertifikasi_kompetensi_1" />
											    <label for="sertifikasi_kompetensi_1">
											    	Berkontrak Dengan PLN
											    </label>
											</div>
										</li>
										<li>
											<div class="radio icheck-primary">
    											<input class="checkbox__data" type="radio" value="0" name="sertifikasi_kompetensi" id="sertifikasi_kompetensi_2" />
											    <label for="sertifikasi_kompetensi_2">
											    	Tidak Berkontrak Dengan PLN
											    </label>
											</div>
										</li>
									</ul>
									<div class="form--error--message--left" id="form--error--message--sertifikasi_kompetensi"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="form--bot">
				<div class="create__form">
					<div class="create__form__row flex-between">
						<div class="new__form__btn"></div>
						<div class="new__form__btn">
							{{ csrf_field() }}
							<input v-model="models.id" type="hidden" name="id" v-if="edit == true">
							<button class="btn__form" type="submit">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>