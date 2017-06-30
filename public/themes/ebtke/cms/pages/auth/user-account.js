
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudUserAccount() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app',
        data: {

            models: {
                id:'',
                name: '',
                email: '',
                location_id: '',
                password: '',
                confirm_password: '',
            },
            system_id: [],
            menu_id: [],
            form_add_title: "User Accounr Manager",
            id: '',
            edit: false,
            responseData: {},
        },

        methods: {

            fetchData: function() {

                var domain  = laroute.route('CmsUserAccountGetData', []);
                
                this.$http.get(domain).then(function (response) {
                    response = response.data
                    if(response.status == true) {
                        this.responseData = response.data
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

                var domain  = laroute.route('CmsUserAccountChangeStatus', []);

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

            storeData: function(event) {

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

                $("#UserAccountManagementFrom").ajaxForm(optForm);
                $("#UserAccountManagementFrom").submit();
            },

            resetForm: function(setEditToFalse) {

                if(setEditToFalse) {
                    this.edit = false
                }

                this.models.id = ''
                this.models.name = ''
                this.models.email = ''
                this.models.password = ''
                this.models.confirm_password = ''

                this.menu_id = [];

                this.form_add_title = "User Accounr Manager"
                document.getElementById("UserAccountManagementFrom");

                this.clearErrorMessage()

                $('.checkbox icheck-wetasphalt input[type=checkbox]').removeAttr('checked');
            },

            clearErrorMessage: function() {
                $(".form--error--message").text('')
            },

        },
        mounted: function () {
            this.fetchData();
        }

    });
}
