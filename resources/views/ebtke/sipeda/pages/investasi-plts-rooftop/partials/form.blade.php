<form action="{{ route('sipeda_investasi_plts_rooftop_store') }}" method="POST" id="sipeda_investasi_plts_rooftop" class="form" enctype="multipart/form-data" @submit.prevent>
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
									<label>Nama Pemilik</label>
									<input name="nama_pemilik" v-model="models.nama_pemilik" type="text" id="nama_pemilik" class="new__form__input__field" placeholder="Enter The nama pemilik">
									<div class="form--error--message--left" id="form--error--message--nama_pemilik"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Sumber Dana</label>
									<select class="form-control" name="sumber_dana" v-model="models.sumber_dana">
										<option value="Nasional">Nasional</option>
										<option value="Asing">Asing</option>
										<option value="CSR Badan Usaha">CSR Badan Usaha</option>
										<option value="Perorangan">Perorangan</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--sumber_dana"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Lokasi <b>Provinsi</b></label>
									<select id="provinsi__choise" class="form-control" name="provinsi_id" v-model="models.provinsi_id" v-on:change="showKabupaten">
										<option v-for="provinsi in responseData.provinsi" :value="provinsi.id" >@{{ provinsi.nama_provinsi }}</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--provinsi_id"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Lokasi <b>Kabupaten</b></label>
									<select class="form-control" name="kabupaten_id" v-model="models.kabupaten_id">
									<option v-for="kabupaten in responseDataKabupaten" :value="kabupaten.id">@{{ kabupaten.nama_kabupaten }}</option>
									</select>
									<div class="form--error--message--left" id="form--error--message--kabupaten_id"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Koordinat <b>Latitude</b></label>
									<input name="latitude" v-model="models.latitude" type="text" id="latitude" class="new__form__input__field" placeholder="Enter The latitude">
									<div class="form--error--message--left" id="form--error--message--latitude"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Koordinat <b>Longitude</b></label>
									<input name="longitude" v-model="models.longitude" type="text" id="longitude" class="new__form__input__field" placeholder="Enter The longitude">
									<div class="form--error--message--left" id="form--error--message--longitude"></div>
								</div>
							</div>

							<div class="create__form__row">
								<div class="new__form__field">
									<label>Kapasitas PLTS Rooftop <b>(kW)</b></label>
									<input name="kapasitas_plts" v-model="models.kapasitas_plts" type="text" id="kapasitas_plts" class="new__form__input__field" placeholder="Enter The Kapasitas Plts">
									<div class="form--error--message--left" id="form--error--message--kapasitas_plts"></div>
								</div>
							</div>
							
							<div class="create__form__row">
								<div class="new__form__field">
									<label>Tahun Investasi</label>
									<select class="form-control" name="tahun_investasi" v-model="models.tahun_investasi">
										<option v-for="year in year" :value="year">@{{ year }}</option>
									</select>
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