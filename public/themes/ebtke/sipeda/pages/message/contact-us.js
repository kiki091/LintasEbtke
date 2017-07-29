
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 *
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

function crudContactUs() {
    var token = Vue.http.headers.common['X-CSRF-TOKEN'] = $("#_token").attr("value");

    var controller = new Vue({
    	el: '#app',
        data: {

            models: {
                id: '',
                fullname: '',
                email: '',
                question: '',
                message: '',
            },
            delete_payload: {
              id: ''
            },

            form_add_title: "Contact Us User Manager",
            id: '',
            edit: false,
            showModal: false,
            responseData: {}
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

            fetchData: function() {

                var domain  = laroute.route('CmsContactUsGetData', []);
                
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

            showData: function(id) {

                this.edit = true
                var payload = []
                payload['id'] = id
                payload['_token'] = token

                var form = new FormData();

                for (var key in payload) {
                    form.append(key, payload[key])
                }

                var domain  = laroute.route('CmsContactUsShowData', []);
                this.$http.post(domain, form).then(function(response) {

                    response = response.data
                    if (response.status) {
                        this.models = response.data

                        this.form_add_title = "Detail Contact Us User Manager"
                        $('#toggle-form-content').slideDown(400)

                        scrollTop()

                    } else {
                        pushNotif(response.status,response.message)
                    }
                })
            },
            
            deleteData: function(id) {
                var domain  = laroute.route('CmsContactUsDeleteData', []);
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


                this.models.id = ''
                this.models.fullname = ''
                this.models.email = ''
                this.models.question = ''
                this.models.message = ''

                this.id = ''

                this.form_add_title = "Contact Us User Manager"
                document.getElementById("ContactUsManagementFrom");

                this.edit = false
            },

        },

        mounted: function () {
            this.fetchData();
        }

    });
}
