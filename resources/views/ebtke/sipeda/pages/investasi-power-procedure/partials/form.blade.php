<form action="{{ route('sipeda_investasi_power_producer_store') }}" method="POST" id="sipeda_investasi_power_producer" class="form" enctype="multipart/form-data" @submit.prevent>
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
									<select name="proyek_power_producer_id" v-model="models.proyek_power_producer_id">
										<option v-for="proek_producer in responseData.proyek_producer" :value="proek_producer.id">
											@{{ proek_producer.nama_proyek}}
										</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--proyek_power_producer_id"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sumber Dana</label>
									<select name="sumber_dana" v-model="models.sumber_dana">
										<option value="PMA">PMA</option>
										<option value="PMDN">PMDN</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--sumber_dana"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Status</label>
									<select name="status" v-model="models.status">
										<option value="1">Izin Usaha Penyediaan Tenaga Listrik Sementara</option>
										<option value="2">Perjanjian Jual Beli Listrik</option>
										<option value="3">Financial Close</option>
										<option value="4">Izin Usaha Penyediaan Tenaga Listrik</option>
										<option value="5">Pelaksanaan Pembangunan</option>
										<option value="6">Commercial Operation date (COD)</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--status"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Tahun Investasi</label>
									<div class="content__input__wrapper__form">
										<div class="input-icon">
											<input v-model="models.tahun_investasi" name="tahun_investasi" type="text" class="form-control datepick" placeholder="Tahun Investasi">
											<div class="icon__wrapper__form date-icon">
		                                        <i class="ico-date"></i>
		                                    </div>
										</div>
									</div>
									<div class="form--error--message--left" id="form--error--message--tahun_investasi"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Penambahan Kapasitas</label>
									<input name="penambahan_kapasitas" v-model="models.penambahan_kapasitas" type="text" id="penambahan_kapasitas" class="new__form__input__field" placeholder="Enter The Penambahan Kapasitas">
									<div class="form--error--message--left" id="form--error--message--penambahan_kapasitas"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Penambahan Komponen</label>
									<input name="penambahan_komponen" v-model="models.penambahan_komponen" type="text" id="penambahan_komponen" class="new__form__input__field" placeholder="Enter The Penambahan Komponen">
									<div class="form--error--message--left" id="form--error--message--penambahan_komponen"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Peingkatan Efisiensi</label>
									<input name="peningkatan_efisiensi" v-model="models.peningkatan_efisiensi" type="text" id="peningkatan_efisiensi" class="new__form__input__field" placeholder="Enter The Peingkatan Efisiensi">
									<div class="form--error--message--left" id="form--error--message--peningkatan_efisiensi"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Rencana Investasi</label>
									<input name="rencana_investasi" v-model="models.rencana_investasi" type="text" id="rencana_investasi" class="new__form__input__field" placeholder="Enter The Rencana Investasi" v-on:keyup="formatToCurency('rencana_investasi')">
									<div class="form--error--message--left" id="form--error--message--rencana_investasi"></div>
								</div>
							</div>
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Realisasi Investasi</label>
									<input name="realisasi_investasi" v-model="models.realisasi_investasi" type="text" id="realisasi_investasi" class="new__form__input__field" placeholder="Enter The Realisasi Investasi" v-on:keyup="formatToCurency('realisasi_investasi')">
									<div class="form--error--message--left" id="form--error--message--realisasi_investasi"></div>
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