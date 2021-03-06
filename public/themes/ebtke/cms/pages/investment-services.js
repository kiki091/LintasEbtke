
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudInvestmentServices() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app',
        data: {

            models: {
                
                language_selected : [],
                all_language : false,
                title : {"en":"","id":""},
                slug : {"en":"","id":""},
                introduction : {"en":"","id":""},
                description : {"en":"","id":""},
                meta_title : {"en":"","id":""},
                meta_keyword : {"en":"","id":""},
                meta_description : {"en":"","id":""},
                investment_services_related_id: [],
            },
            delete_payload: {
              id: ''
            },
            supported_language: lintas.supported_language,
            lintas_default_language: lintas.lintas_default_language,
            total_detail_image : [0],
            default_total_detail_image : [0],
            thumbnail : '',
            filename: {0: '', 1:'', 2:'', 3: ''},
            filename_edit: {0: '', 1:'', 2:'', 3: ''},
            images_edit: {0: '', 1:'', 2:'', 3: ''},
            image_big_preview: '',
            last_language_key: '',
            image: '',

            form_add_title: "Investment Services Content Manager",
            investment_services_related_id: [],
            id: '',
            edit: false,
            showModal: false,
            responseData: {},
            image_big_preview: ''
        },
        filters: {
            strSlug: function(data) {
                return data.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
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

            onImageSliderChange: function(element, index, e) {

                var files = e.target.files || e.dataTransfer.files

                if (!files.length) {
                    return;
                }

                this.filename[index] = files[0];
                this.createImageSlider(files[0], element, index);
            },

            createImageSlider: function(file, setterTo, index) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = function (e) {
                    vm[setterTo][index] = e.target.result
                };
                reader.readAsDataURL(file);
            },

            previewImage: function (image_url) {
                this.image_big_preview = image_url
            },

            removeImageSlider: function (element, index) {
                this[element][index] = ''
            },

            removeImageWrapper: function(item) {
                this.removeImageSlider('filename', item)
                //Vue.delete(this.default_total_detail_image, item);
                console.log(item)
                this.default_total_detail_image.splice(item,1)
            },

            showElementByDefaultLang: function(langId) {
                return this.lintas_default_language == langId
            },

            addMoreImageSlider: function() {
                this.default_total_detail_image.splice(this.default_total_detail_image.length + 1, 0, {});
            },

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

            previewImage: function (image_url) {
                this.image_big_preview = image_url
            },

            fetchData: function() {

                var domain  = laroute.route('InvestmentServicesGetData', []);
                
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

                $("#InvestmentServicesManagementFrom").ajaxForm(optForm);
                $("#InvestmentServicesManagementFrom").submit();
            },

            postEditImageSlider: function(event) {

                var vm = this;
                var optForm      = {

                    dataType: "json",

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
                        setTimeout(function(){
                            hideLoading()
                        }, 3000);
                        
                    }

                };

                $("#InvestmentServicesImageSliderFrom").ajaxForm(optForm);
                $("#InvestmentServicesImageSliderFrom").submit();
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

                var domain  = laroute.route('InvestmentServicesEditData', []);
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.models = response.data
                        this.thumbnail = response.data.thumbnail_url
                        this.filename = response.data.filename_url
                        this.investment_services_related_id = response.data.investment_services_related_id
                        this.default_total_detail_image = []

                        /*$.each(response.data.news, function(index, key) {
                            document.getElementById("checkbox-investment_services_related_id-"+key.id).checked = true;
                        });*/

                        this.form_add_title = "Edit Investment Services Content Manager"
                        $('.btn__add').click()

                        destroyInstanceCkEditor()
                        replaceToCkEditor()
                        scrollTop()

                    } else {
                        pushNotif(response.status,response.message)
                    }
                })
            },

            editImageSlider: function (id) {
                this.edit   = true

                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('InvestmentServicesEditData', []);
                this.$http.post(domain, form).then(function(response) {
                    response = response.data
                    if (response.status) {
                        this.id = response.data.id
                        this.filename_edit = response.data.filename_url
                        this.total_detail_image = response.data.total_detail_image
                        this.images_edit = response.data.images

                        this.form_add_title = "Edit Image Slider Investment Services Manager"
                        this.default_total_detail_image = [];

                        $('#toggle-form-photo-uploader-content').slideDown(400)

                    } else {
                        pushNotif(response.status, response.message)
                    }
                })
            },

            changeStatus: function(id) {
                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('InvestmentServicesChangeStatus', []);

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
                var domain  = laroute.route('InvestmentServicesDeleteData', []);
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

            removeImageSliderFromServer: function (id, index) {

                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('InvestmentServicesDeleteData', []);
                this.$http.post(domain, form).then(function(response) {
                    response = response.data

                    if (response.status) {
                        //this.total_detail_image.$remove(index)

                        this.total_detail_image.splice(index,1)
                    }

                    pushNotif(response.status, response.message)
                })
            },

            resetForm: function(setEditToFalse) {

                for (var supported_lang in this.supported_language) {
                    this.models.title[supported_lang] = ''
                    this.models.slug[supported_lang] = ''
                    this.models.introduction[supported_lang] = ''
                    this.models.description[supported_lang] = ''
                    this.models.meta_title[supported_lang] = ''
                    this.models.meta_keyword[supported_lang] = ''
                    this.models.meta_description[supported_lang] = ''
                }

                this.models.language_selected = [this.lintas_default_language]

                this.models.id = ''

                this.models['language_selected'] = [];
                this.thumbnail = '';
                this.filename = {0: '', 1:'', 2:'', 3: ''};
                this.filename_edit = {0: '', 1:'', 2:'', 3: ''};

                this.images_edit = {0: '', 1:'', 2:'', 3: ''},
                this.images = [];
                this.investment_services_related_id = [];
                this.default_total_detail_image = [0];
                this.total_detail_image = [0];
                this.id = ''

                this.form_add_title = "Investment Services Content Manager"
                document.getElementById("InvestmentServicesManagementFrom");

                this.clearErrorMessage()

                $('select').prop('selectedIndex', 0);
                $('textarea').val('');
                $('.ckeditor').val('');

                this.edit = false

                destroyInstanceCkEditor()
                replaceToCkEditor()

                $('.checkbox__data').removeAttr('checked');
            },

            sortable: function() {
                var vm = this;

                setTimeout(function(){
                    Sortable.create(document.getElementById('sort'), {
                        draggable: 'li.sort-item',
                        ghostClass: "sort-ghost",
                        handle: '.handle',
                        animation: 300,
                        onUpdate: function(evt) {
                            vm.reorder(evt.oldIndex, evt.newIndex);
                        }
                    });

                }, 100);
            },


            reorder: function(oldIndex, newIndex) {
                //get id list
                var ids = document.getElementsByClassName('sort-item'),
                    id_order  = [].map.call(ids, function(input) {
                        return input.getAttribute('data-id');
                    });

                var domain  = laroute.route('InvestmentServicesOrderData', []);

                var payload = {list_order: id_order, _token:token };

                this.$http.post(domain, payload).then(function(response) {
                    if (response.data.status == false) {
                        this.fetchData()
                        pushNotif(response.status, response.message);
                    } else {
                        this.fetchData()
                        pushNotif(response.status, response.message);
                    }
                });
            },

            importTemplate: function(id, supportedLangKey) {
                try {
                    switch(id) {
                        case 'template-introduction':
                            CKEDITOR.instances['editor-' + supportedLangKey + '-1'].setData($('#' + id).html());
                            break;
                        case 'template-description':
                            CKEDITOR.instances['editor-' + supportedLangKey + '-2'].setData($('#' + id).html());
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
