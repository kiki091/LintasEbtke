
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudCapacityBuilding() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app_sipeda',
        data: {

            models: {
                id : '',
                topik_kegiatan : '',
                request_topik : '',
                penyelenggara_kegiatan : '',
                tahun_perencanaan : '',
                tahun_pelaksanaan : '',
                target_peserta : '',
                realisasi_peserta : '',
                sasaran_peserta : '',
                jenis_institusi_peserta : '',
                total_biaya : '',
                sumber_pendanaan : '',
                sertifikasi_kompetensi : '',
                sumber_data : '',
                keterangan : '',
                lokasi_id : [
                    {desa : '',kecamatan_id : '',kabupaten_id : '',provinsi_id : '',latitude: '',longitude: '',luas_wilayah : ''}
                ],
                jenis_kegiatan_id : '',
            },
            delete_payload: {
              id: ''
            },
            lokasi_id : [
                {desa : '',kecamatan_id : '',kabupaten_id : '',provinsi_id : '',latitude: '', longitude: '',luas_wilayah : ''}
            ],
            form_add_title: "Capacity Building Content Manager",
            id: '',
            edit: false,
            showModal: false,
            responseData: {},
        },
        filters: {
            strSlug: function(data) {
                return data.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
            }

        },

        methods: {

            showDeleteModal: function(id) {

                this.showModal = true;
                this.delete_payload.id = id;

                $('.popup__mask__alert').addClass('is-visible');

                // add class di container saat popup
                $('.container__main').addClass('popupContainer');
            },

            closeDeleteModal: function() {
                this.showModal = false;

                // remove class di container saat popup
                setTimeout(function() {
                    $('.popup__mask__alert').removeClass('is-visible');
                }, 300);
            },

            addMoreLocationData: function() {
                this.models.lokasi_id.splice(this.models.lokasi_id.length + 1, 0, {desa : '',kecamatan_id : '',kabupaten_id : '',provinsi_id : '',latitude: '', longitude: '',luas_wilayah : ''});
            },

            fetchData: function() {

                var domain  = laroute.route('sipeda_capacity_building_data', []);
                
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

                $("#CapacityBuildingFrom").ajaxForm(optForm);
                $("#CapacityBuildingFrom").submit();
            },

            editData: function(id) {

                this.edit = true
                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('sipeda_capacity_building_edit', []);
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.models = response.data
                        this.thumbnail = response.data.thumbnail_url

                        this.form_add_title = "Edit Capacity Building Content Manager"
                        $('.btn__add').click()

                        destroyInstanceCkEditor()
                        replaceToCkEditor()
                        scrollTop()

                    } else {
                        pushNotif(response.status,response.message)
                    }
                })
            },

            publish: function(id) {
                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('sipeda_capacity_building_publish', []);

                this.$http.post(domain, form).then(function(response) {
                    response = response.data
                    if (response.status == false) {
                        this.fetchData()
                        pushNotif(response.status,response.message);
                    }
                    else{
                        pushNotif(response.status,response.message);
                    }
                })
            },
            
            deleteData: function(id) {
                var domain  = laroute.route('sipeda_capacity_building_delete', []);
                var form = new FormData();
                
                form.append('id', id);
                form.append('_token', token)

                this.$http.post(domain, form).then(function (response) {
                    response = response.data
                    if (response.status === true)
                    {
                        this.delete_payload.id = '';
                        this.fetchData()
                    }
                    this.showModal = false
                    setTimeout(function() {
                        $('.popup__mask__alert').removeClass('is-visible');
                    }, 300);
                    pushNotif(response.status, response.message);
                });
            },

            resetForm: function(setEditToFalse) {

                this.models.lokasi_id = [
                    {desa : '',kecamatan_id : '',kabupaten_id : '',provinsi_id : '',latitude: '', longitude: '',luas_wilayah : ''}
                ];

                this.models.id = ''
                this.models.topik_kegiatan = ''
                this.models.request_topik = ''
                this.models.penyelenggara_kegiatan = ''
                this.models.tahun_perencanaan = ''
                this.models.tahun_pelaksanaan = ''
                this.models.target_peserta = ''
                this.models.realisasi_peserta = ''
                this.models.sasaran_peserta = ''
                this.models.jenis_institusi_peserta = ''
                this.models.total_biaya = ''
                this.models.sumber_pendanaan = ''
                this.models.sertifikasi_kompetensi = ''
                this.models.sumber_data = ''
                this.models.keterangan = ''
                this.models.jenis_kegiatan_id = ''

                this.lokasi_id = [];
                this.id = ''

                this.form_add_title = "Capacity Building Content Manager"
                document.getElementById("CapacityBuildingFrom");

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
