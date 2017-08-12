
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudInvestasiPltsRooftop() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app_sipeda',
        data: {
            models: {
                id : '',
                nama_pemilik : '',
                sumber_dana : '',
                provinsi_id : '',
                kabupaten_id : '',
                latitude : '',
                longitude : '',
                kapasitas_plts : '',
                tahun_investasi : '',
                penambahan_kapasitas : '',
                penambahan_komponen : '',
                peningkatan_efisiensi : '',
                rencana_investasi : '',
                realisasi_investasi : '',
            },
            year : ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            max_year : '2025',
            delete_payload: {
              id: ''
            },
            form_add_title: "Investasi PLTS Rooftop",
            id: '',
            edit: false,
            showModal: false,
            responseData: {},
            responseDataKabupaten: {},
        },
        filters: {
            strSlug: function(data) {
                return data.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
            }

        },

        methods: {

            formatToCurency: function (element) 
            {
                if(element == 'rencana_investasi') 
                {
                    val = $('#rencana_investasi').val()
                    
                    this.models.rencana_investasi = (val.replace(/[^\d\.]/g, "")).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                } else {
                    val = $('#realisasi_investasi').val()
                    
                    this.models.realisasi_investasi = (val.replace(/[^\d\.]/g, "")).toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
                }
            },

            fetchData: function() {

                var domain  = laroute.route('sipeda_investasi_plts_rooftop_data', []);
                
                this.$http.get(domain).then(function (response) {
                    response = response.data
                    if(response.status == true) {
                        this.responseData = response.data
                    } else {
                        pushNotif(response.status, response.message)
                    }
                })

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


                var domain  = laroute.route('sipeda_investasi_plts_rooftop_data_location', []);
                
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.responseDataKabupaten = response.data
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

                $("#sipeda_investasi_plts_rooftop").ajaxForm(optForm);
                $("#sipeda_investasi_plts_rooftop").submit();
            },


            resetForm: function(setEditToFalse) {

                this.models.id = ''
                this.models.nama_pemilik = ''
                this.models.sumber_dana = ''
                this.models.provinsi_id = ''
                this.models.kabupaten_id = ''
                this.models.latitude = ''
                this.models.longitude = ''
                this.models.kapasitas_plts = ''
                this.models.tahun_investasi = ''
                this.models.penambahan_kapasitas = ''
                this.models.penambahan_komponen = ''
                this.models.peningkatan_efisiensi = ''
                this.models.rencana_investasi = ''
                this.models.realisasi_investasi = ''

                this.id = ''

                this.form_add_title = "Investasi PLTS Rooftop"
                document.getElementById("sipeda_investasi_plts_rooftop");

                this.clearErrorMessage()

                $('select').prop('selectedIndex', 1);
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
