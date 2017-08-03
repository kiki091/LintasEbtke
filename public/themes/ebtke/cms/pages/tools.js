
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudResourceTools() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app',
        data: {

            models: {
                
                language_selected : [],
                all_language : false,
                filename : '',
                slug : '',
                version : '',
                country : '',
                tools_type : '',
                platform : '',
                manufacture : '',
                url : '',
                file_size : '',
                platform : '',
                description : {"en":"","id":""},
                meta_title : {"en":"","id":""},
                meta_keyword : {"en":"","id":""},
                meta_description : {"en":"","id":""},
                tools_related_id: [],
            },
            delete_payload: {
              id: ''
            },
            supported_language: lintas.supported_language,
            lintas_default_language: lintas.lintas_default_language,
            thumbnail : '',
            filename: '',
            last_language_key: '',
            image: '',

            form_add_title: "Tools Content Manager",
            tools_related_id: [],
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

            fetchData: function() {

                var domain  = laroute.route('ToolsGetData', []);
                
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

                $("#ToolsContentManagementFrom").ajaxForm(optForm);
                $("#ToolsContentManagementFrom").submit();
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

                var domain  = laroute.route('ToolsEditData', []);
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.models = response.data
                        this.thumbnail = response.data.thumbnail_url
                        this.tools_related_id = response.data.tools_related_id

                        this.form_add_title = "Edit Tools Content Manager"
                        $('.btn__add').click()

                        destroyInstanceCkEditor()
                        replaceToCkEditor()
                        scrollTop()

                    } else {
                        pushNotif(response.status,response.message)
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

                var domain  = laroute.route('ToolsChangeStatus', []);

                this.$http.post(domain, form).then(function(response) {
                    response = response.data
                    if (response.status == false) {
                        this.fetchData()
                        pushNotif(response.status,response.message);
                    }
                    else{

                        this.fetchData()
                        pushNotif(response.status,response.message);
                    }
                })
            },
            
            deleteData: function(id) {
                var domain  = laroute.route('ToolsDeleteData', []);
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

            resetForm: function() {

                for (var supported_lang in this.supported_language) {
                    this.models.description[supported_lang] = ''
                    this.models.meta_title[supported_lang] = ''
                    this.models.meta_keyword[supported_lang] = ''
                    this.models.meta_description[supported_lang] = ''
                }

                this.models.language_selected = [this.lintas_default_language]

                this.models.id = ''
                this.models.filename = ''
                this.models.slug = ''
                this.models.version = ''
                this.models.country = ''
                this.models.tools_type = ''
                this.models.platform = ''
                this.models.manufacture = ''
                this.models.url = ''
                this.models.file_size = ''
                this.models.tools_related_id = [];

                this.models['language_selected'] = [];
                this.thumbnail = '';
                this.url = '';

                this.tools_related_id = [];
                this.id = ''

                this.form_add_title = "Tools Content Manager"
                document.getElementById("ToolsContentManagementFrom");

                this.clearErrorMessage()

                $('select').prop('selectedIndex', 0);
                $('textarea').val('');
                $('.ckeditor').val('');

                this.edit = false

                destroyInstanceCkEditor()
                replaceToCkEditor()

                $('.checkbox__data').removeAttr('checked');
            },

            importTemplate: function(id, supportedLangKey) {
                try {
                    switch(id) {
                        case 'template-description':
                            CKEDITOR.instances['editor-' + supportedLangKey + '-1'].setData($('#' + id).html());
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
