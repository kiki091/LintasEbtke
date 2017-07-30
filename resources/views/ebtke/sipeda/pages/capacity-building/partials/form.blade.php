<form action="{{ route('sipeda_capacity_building_store') }}" method="POST" id="CapacityBuildingFrom" class="form" enctype="multipart/form-data" @submit.prevent>
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
				<div class="create__form content__tab">
					<div class="form__group__row">
						<div class="create__form__row">
							<span class="form__group__title">General Information<a href="javascript:void(0);" class="style__accordion" data-accordion="form-accordion-1"><i>@include('ebtke.sipeda.svg-logo.ico-expand-arrow')</i></a></span>
						</div>
						<div id="form-accordion-1">
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Topik Kegiatan</label>
									<input v-model="models.topik_kegiatan" name="topik_kegiatan" type="text" id="topik_kegiatan" class="new__form__input__field" placeholder="Enter the topik kegiatan here">
									<div class="form--error--message--left" id="form--error--message--topik_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Pengusulan Topik</label>
									<input v-model="models.request_topik" name="request_topik" type="text" id="request_topik" class="new__form__input__field" placeholder="Enter the topik kegiatan here">
									<div class="form--error--message--left" id="form--error--message--request_topik"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Penyelenggara Kegiatan</label>
									<input v-model="models.penyelenggara_kegiatan" name="penyelenggara_kegiatan" type="text" id="penyelenggara_kegiatan" class="new__form__input__field" placeholder="Enter the topik kegiatan here">
									<div class="form--error--message--left" id="form--error--message--penyelenggara_kegiatan"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Tahun Perenacanaan</label>
									<div class="content__input__wrapper__form">
										<div class="input-icon">
											<input v-model="models.tahun_perencanaan" name="tahun_perencanaan" type="text" class="form-control datetimepicker datetime start" placeholder="Isikan tahun perencanaan">
											<div class="icon__wrapper__form date-icon">
		                                        <i class="ico-date"></i>
		                                    </div>
										</div>
									</div>
									<div class="form--error--message" id="form--error--message--tahun_perencanaan"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Tahun Pelaksanaan</label>
									<div class="content__input__wrapper__form">
										<div class="input-icon">
											<input v-model="models.tahun_pelaksanaan" name="tahun_pelaksanaan" type="text" class="form-control datetimepicker datetime end" placeholder="Isikan tahun perencanaan">
											<div class="icon__wrapper__form date-icon">
		                                        <i class="ico-date"></i>
		                                    </div>
										</div>
									</div>
									<div class="form--error--message" id="form--error--message--tahun_pelaksanaan"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Target Peserta <b>(orang)</b></label>
									<input v-model="models.target_peserta" name="target_peserta" type="number" id="target_peserta" class="new__form__input__field" placeholder="Enter the topik kegiatan here">
									<div class="form--error--message--left" id="form--error--message--target_peserta"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Realisasi Peserta <b>(orang)</b></label>
									<input v-model="models.realisasi_peserta" name="realisasi_peserta" type="number" id="realisasi_peserta" class="new__form__input__field" placeholder="Enter the topik kegiatan here">
									<div class="form--error--message--left" id="form--error--message--realisasi_peserta"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sasaran Peserta</label>
									<input v-model="models.sasaran_peserta" name="sasaran_peserta" type="text" id="sasaran_peserta" class="new__form__input__field" placeholder="Enter the topik kegiatan here">
									<div class="form--error--message--left" id="form--error--message--sasaran_peserta"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Jenis Institusi  Asal Peserta</label>
									<select name="jenis_institusi_peserta" v-model="models.jenis_institusi_peserta">
										<option value="">Pilih Jenis Institusi  Asal Peserta</option>
										<option value="1">Praktisi</option>
										<option value="2">Institusi Pemerintah</option>
										<option value="3">BUMN</option>
										<option value="4">Swasta</option>
									</select>

									<div class="form--error--message--left" id="form--error--message--jenis_institusi_peserta"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Total Biaya <b>(Rp)</b></label>
									<input v-model="models.total_biaya" name="total_biaya" type="number" id="total_biaya" class="new__form__input__field" placeholder="Enter the total biaya kegiatan here">
									<div class="form--error--message--left" id="form--error--message--total_biaya"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sumber Pendanaan</label>
									<input v-model="models.sumber_pendanaan" name="sumber_pendanaan" type="text" id="sumber_pendanaan" class="new__form__input__field" placeholder="Enter the total biaya kegiatan here">
									<div class="form--error--message--left" id="form--error--message--sumber_pendanaan"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field full-width">
									<label>Sertifikasi Kompetensi</label>
									<ul class="to_do">
										<li>
											<div class="radio icheck-primary">
    											<input class="checkbox__data" type="radio" :value="1" name="sertifikasi_kompetensi" id=" sertifikasi_kompetensi" />
											    <label for="sertifikasi_kompetensi">
											    	Yes
											    </label>
											</div>
										</li>
										<li>
											<div class="radio icheck-primary">
    											<input class="checkbox__data" type="radio" :value="0" name="sertifikasi_kompetensi" id=" sertifikasi_kompetensi" />
											    <label for="sertifikasi_kompetensi">
											    	No
											    </label>
											</div>
										</li>
									</ul>
									<div class="form--error--message--left" id="form--error--message--sertifikasi_kompetensi"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sumber Data</label>
									<input v-model="models.sumber_data" name="sumber_data" type="text" id="sumber_data" class="new__form__input__field" placeholder="Enter the total biaya kegiatan here">
									<div class="form--error--message--left" id="form--error--message--sumber_data"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="create__form__row">
									<div class="new__form__field full-width" style="width: 500px;">
										<label>Keterangan</label>
										<textarea v-model="models.keterangan" name="keterangan" class="ckeditor" id="editor-1"></textarea>
										<div class="form--error--message" id="form--error--message--keterangan"></div>
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