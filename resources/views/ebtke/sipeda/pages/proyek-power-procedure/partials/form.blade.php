<form action="{{ route('sipeda_proyek_power_producer_store') }}" method="POST" id="sipeda_proyek_power_producer" class="form" enctype="multipart/form-data" @submit.prevent>
	<div class="main__content__form__layer" id="toggle-form-content" style="display: none;">
		<div class="create__form__wrapper">
			<div class="form--top flex-between">
				<div class="form__title">@{{ form_add_title }}</div>
				<div class="form--top__btn">
					<a href="#" class="btn__add__cancel" @click="clearCkEditor">Cancel</a>
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
									<input name="nama_proyek" v-model="models.nama_proyek" type="text" id="nama_proyek" class="new__form__input__field" placeholder="Enter the Nama Proyek IPP">
									<div class="form--error--message--left" id="form--error--message--nama_proyek"></div>
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
									<select v-model="models.provinsi_id" name="provinsi_id">
										<option value="1">Nusa Tenggara Timur</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kabupaten</label>
									<select v-model="models.kabupaten_id" name="kabupaten_id">
										<option value="1">Kupang</option>	
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kecamatan</label>
									<select v-model="models.kecamatan_id" name="kecamatan_id">
										<option value="1">Kupang Tengah</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Desa</label>
									<select v-model="models.desa_id" name="desa_id">
										<option value="1">Oelpuah</option>
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
									<input name="jenis_pembangkit" v-model="models.jenis_pembangkit" type="text" id="jenis_pembangkit" class="new__form__input__field" placeholder="Enter the Jenis Pembangkit">
									<div class="form--error--message--left" id="form--error--message--jenis_pembangkit"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Koordinat (WGS 84)</label>
									<input name="koordinat" v-model="models.koordinat" type="text" id="koordinat" class="new__form__input__field" placeholder="Enter the Koordinat">
									<div class="form--error--message--left" id="form--error--message--koordinat"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kapasitas Terpasang <b>(kW)</b></label>
									<input name="kapasitas_terpasang" v-model="models.kapasitas_terpasang" type="text" id="kapasitas_terpasang" class="new__form__input__field" placeholder="Enter the Kapasitas Terpasang">
									<div class="form--error--message--left" id="form--error--message--kapasitas_terpasang"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Rata-rata Produksi Energi Listrik Tahunan</label>
									<input name="produksi_energi_tahunan" v-model="models.produksi_energi_tahunan" type="text" id="produksi_energi_tahunan" class="new__form__input__field" placeholder="Enter the Rata-rata Produksi Energi Listrik">
									<div class="form--error--message--left" id="form--error--message--produksi_energi_tahunan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sharing Equity</label>
									<input name="sharing_equity" v-model="models.sharing_equity" type="text" id="sharing_equity" class="new__form__input__field" placeholder="Enter the Sharing Equity">
									<div class="form--error--message--left" id="form--error--message--sharing_equity"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Jenis Energi Primer</label>
									<input name="jenis_energy_primer" v-model="models.jenis_energy_primer" type="text" id="jenis_energy_primer" class="new__form__input__field" placeholder="Enter the Jenis Energi Primer">
									<div class="form--error--message--left" id="form--error--message--jenis_energy_primer"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>COD</label>
									<div class="content__input__wrapper__form">
										<div class="input-icon">
											<input v-model="models.cod" name="cod" type="text" class="form-control datetimepicker datetime start" placeholder="COD">
											<div class="icon__wrapper__form date-icon">
		                                        <i class="ico-date"></i>
		                                    </div>
										</div>
									</div>
									<div class="form--error--message--left" id="form--error--message--cod"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field full-width">
									<label>Terikat Kontrak</label>
									<ul class="to_do">
										<li>
											<div class="radio icheck-primary">
    											<input class="checkbox__data" type="radio" value="1" name="kontrak_pln" id="kontrak_pln_1" />
											    <label for="kontrak_pln_1">
											    	Berkontrak Dengan PLN
											    </label>
											</div>
										</li>
										<li>
											<div class="radio icheck-primary">
    											<input class="checkbox__data" type="radio" value="0" name="kontrak_pln" id="kontrak_pln_2" />
											    <label for="kontrak_pln_2">
											    	Tidak Berkontrak Dengan PLN
											    </label>
											</div>
										</li>
									</ul>
									<div class="form--error--message--left" id="form--error--message--kontrak_pln"></div>
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
							<button class="btn__form" type="submit" @click="storeData">Save</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>