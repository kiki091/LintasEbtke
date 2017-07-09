
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudCompanyHistory() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app',
        data: {

            models: {
                id: '',
                language_selected : [],
                all_language : false,
                title : {"en":"","id":""},
                slug : {"en":"","id":""},
                introduction : {"en":"","id":""},
                description_left : {"en":"","id":""},
                description_right : {"en":"","id":""},
                meta_title : {"en":"","id":""},
                meta_keyword : {"en":"","id":""},
                meta_description : {"en":"","id":""},
            },
            banner: {
                language_selected : [],
                id : '',
                title : {"en":"","id":""},
                filename : {0: '', 1:'', 2:'', 3: ''},
            },

            filename : {0: '', 1:'', 2:'', 3: ''},
            filename_url : {0: '', 1:'', 2:'', 3: ''},

            delete_payload: {
              id: ''
            },
            supported_language: lintas.supported_language,
            lintas_default_language: lintas.lintas_default_language,
            
            image : '',
            file : '',
            last_language_key: '',

            form_add_title: "Company History Manager",
            form_add_title_banner: "Banner Company History",
            id: '',
            edit: false,
            edit_banner : false,
            responseData: {},
        },
        filters: {
            strSlug: function(data) {
                return data.replace(/\/| /g, "-")
            }

        },

        methods: {

            onImageChange: function(element, e) {
                var files = e.target.files || e.dataTransfer.files

                if (!files.length)
                    return;

                this.models[element] = files[0]
                this.createImage(files[0], element);
            },

            createImage: function(file, setterTo) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = function (e) {
                    vm[setterTo] = e.target.result;
                };
                reader.readAsDataURL(file);
            },

            removeImage: function (variable) {
                this[variable] = ''
            },

            showElementByDefaultLang: function(langId) {
                return this.lintas_default_language == langId
            },

            fetchData: function() {

                var domain  = laroute.route('CompanyHistoryGetData', []);
                
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

            storeBanner: function(event) {

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

                $("#CompanyHistoryBannerImagesFrom").ajaxForm(optForm);
                $("#CompanyHistoryBannerImagesFrom").submit();
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

                $("#CompanyHistoryManagementFrom").ajaxForm(optForm);
                $("#CompanyHistoryManagementFrom").submit();
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

                var domain  = laroute.route('CompanyHistoryEditData', []);
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.models = response.data
                        this.file = response.data.file_url

                        this.form_add_title = "Edit Company History Manager"
                        $('#toggle-form-content').slideDown(400)

                        destroyInstanceCkEditor()
                        replaceToCkEditor()
                        scrollTop()

                    } else {
                        pushNotif(response.status,response.message)
                    }
                })
            },

            editBanner: function(id) {
                this.edit_banner = true
                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('CompanyHistoryEditBanner', []);
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.banner = response.data
                        this.filename = response.data.filename_url

                        this.form_add_title = "Edit Banner Company History"
                        $('#toggle-form-banner-image-content').slideDown(400)

                        scrollTop()

                    } else {
                        pushNotif(response.status,response.message)
                    }
                })
            },

            resetForm: function(setEditToFalse) {

                for (var supported_lang in this.supported_language) {
                    this.models.title[supported_lang] = ''
                    this.models.slug[supported_lang] = ''
                    this.models.introduction[supported_lang] = ''
                    this.models.description_left[supported_lang] = ''
                    this.models.description_right[supported_lang] = ''
                    this.models.meta_title[supported_lang] = ''
                    this.models.meta_keyword[supported_lang] = ''
                    this.models.meta_description[supported_lang] = ''
                }

                this.models.language_selected = [this.lintas_default_language]

                this.models.id = ''

                this.models['language_selected'] = [];
                this.file = '';
                this.id = ''

                this.form_add_title = "Company History Manager"
                document.getElementById("CompanyHistoryManagementFrom");

                this.clearErrorMessage()

                $('textarea').val('');
                $('.ckeditor').val('');

                this.edit = false

                destroyInstanceCkEditor()
                replaceToCkEditor()

            },

            resetFormBanner: function() {
                for (var supported_lang in this.supported_language) {
                    this.banner.title[supported_lang] = ''
                }

                this.models.language_selected = [this.lintas_default_language]
                this.models['language_selected'] = [];

                this.banner.id = ''
                this.banner.filename = {0: '', 1:'', 2:'', 3: ''},
                this.filename = {0: '', 1:'', 2:'', 3: ''},
                this.filename_url = {0: '', 1:'', 2:'', 3: ''},
                this.edit = false

                this.form_add_title_banner = "Banner Company History"

                document.getElementById("CompanyHistoryBannerImagesFrom");

                this.clearErrorMessage()
            },

            importTemplate: function(id, supportedLangKey) {
                try {
                    switch(id) {
                        case 'template-introduction':
                            CKEDITOR.instances['editor-' + supportedLangKey + '-1'].setData($('#' + id).html());
                            break;
                        case 'template-description_left':
                            CKEDITOR.instances['editor-' + supportedLangKey + '-2'].setData($('#' + id).html());
                            break;
                        case 'template-description_right':
                            CKEDITOR.instances['editor-' + supportedLangKey + '-3'].setData($('#' + id).html());
                            break;
                        default :

                    }
                } catch (err) {
                    pushNotif(false, err.message);
                }
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
