
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudProyekPowerProducer() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app_sipeda',
        data: {
            models: {
                id : '',
                nama_proyek : '',
                jenis_pembangkit : '',
                latitude : '',
                longitude : '',
                kapasitas_terpasang : '',
                produksi_energi_tahunan : '',
                sharing_equity : '',
                jenis_energy_primer : '',
                cod : '',
                kontrak_pln : '',
                provinsi_id : '',
                kabupaten_id : '',
                kecamatan_id : '',
                desa_id : '',
            },
            delete_payload: {
              id: ''
            },
            form_add_title: "Proyek Power Producer",
            id: '',
            edit: false,
            showModal: false,
            responseData: {},
            responseDataKabupaten: {},
            responseDataKecamatan: {},
            responseDataDesa: {},
        },
        filters: {
            strSlug: function(data) {
                return data.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
            }

        },

        methods: {

            formatToNumber: function (element) 
            {
                if(element == 'kapasitas_terpasang') 
                {
                    val = $('#kapasitas_terpasang').val()
                    
                    this.models.kapasitas_terpasang = (val.replace(/[^\d\.]/g, "")).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                } else {
                    val = $('#produksi_energi_tahunan').val()
                    
                    this.models.produksi_energi_tahunan = (val.replace(/[^\d\.]/g, "")).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                }
            },

            fetchData: function() {

                var domain  = laroute.route('sipeda_proyek_power_producer_data', []);
                
                this.$http.get(domain).then(function (response) {
                    response = response.data
                    if(response.status == true) {
                        this.responseData = response.data
                    } else {
                        pushNotif(response.status, response.message)
                    }
                })


                for (var supported_lang in this.supported_language) {
                    this.last_language_key = supported_lang
                }

            },

            showKabupaten: function() {
                var payload = []
                var provinsi_id = $('#provinsi__choise').val()

                payload['provinsi_id'] = provinsi_id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }


                var domain  = laroute.route('sipeda_proyek_power_producer_get_data_kabupaten', []);
                
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.responseDataKabupaten = response.data
                    } else {
                        pushNotif(response.status,response.message)
                    }
                })

            },

            showKecamatan: function() {
                var payload = []
                var kabupaten_id = $('#kabupaten__choise').val()

                payload['kabupaten_id'] = kabupaten_id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }


                var domain  = laroute.route('sipeda_proyek_power_producer_get_data_kecamatan', []);
                
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.responseDataKecamatan = response.data
                    } else {
                        pushNotif(response.status,response.message)
                    }
                })

            },

            showDesa: function() {
                var payload = []
                var kecamatan_id = $('#kecamatan__choise').val()

                payload['kecamatan_id'] = kecamatan_id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }


                var domain  = laroute.route('sipeda_proyek_power_producer_get_data_desa', []);
                
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.responseDataDesa = response.data
                    } else {
                        pushNotif(response.status,response.message)
                    }
                })

            },

            storeData: function(event) {

                var vm = this;
                var optForm      = {

                    dataType: "json",

                    beforeSerialize: function(form, options) {
                        for (instance in CKEDITOR.instances)
                            CKEDITOR.instances[instance].updateElement();
                    },
                    beforeSend: function(){
                        showLoading(true)
                        vm.clearErrorMessage()
                    },
                    success: function(response){
                        if (response.status == false) {
                            if(response.is_error_form_validation) {
                                
                                var message_validation = ''
                                $.each(response.message, function(key, value){
                                    $('input[name="' + key.replace(".", "_") + '"]').focus();
                                    $("#form--error--message--" + key.replace(".", "_")).text(value)
                                    message_validation += '<li class="notif__content__li"><span class="text" >' + value + '</span></li>'
                                });
                                pushNotifValidation(response.status, 'default', message_validation, false);

                            } else {
                                pushNotif(response.status, response.message);
                            }
                        } else {
                            vm.fetchData()
                            pushNotif(response.status, response.message);
                            $('.btn__add__cancel').click();
                            vm.resetForm(true)
                        }
                    },
                    complete: function(response){
                        hideLoading()
                    }

                };

                $("#sipeda_proyek_power_producer").ajaxForm(optForm);
                $("#sipeda_proyek_power_producer").submit();
            },


            resetForm: function(setEditToFalse) {

                this.models.id = ''
                this.models.nama_proyek = ''
                this.models.jenis_pembangkit = ''
                this.models.latitude = ''
                this.models.longitude = ''
                this.models.kapasitas_terpasang = ''
                this.models.produksi_energi_tahunan = ''
                this.models.sharing_equity = ''
                this.models.jenis_energy_primer = ''
                this.models.cod = ''
                this.models.kontrak_pln = ''
                this.models.provinsi_id = ''
                this.models.kabupaten_id = ''
                this.models.kecamatan_id = ''
                this.models.desa_id = ''

                this.id = ''

                this.form_add_title = "Proyek Power Producer"
                document.getElementById("sipeda_proyek_power_producer");

                this.clearErrorMessage()

                $('select').prop('selectedIndex', 0);
                $('textarea').val('');
                $('.ckeditor').val('');

                this.edit = false

                destroyInstanceCkEditor()
                replaceToCkEditor()

                $('.checkbox__data').removeAttr('checked');
            },

            clearErrorMessage: function() {
                $(".form--error--message--left").text('')
            },

            clearCkEditor: function() {
                destroyInstanceCkEditor()
                replaceToCkEditor()
                this.resetForm(true)
            },
        },
        

        mounted: function () {
            this.fetchData();
        }
    });
}
