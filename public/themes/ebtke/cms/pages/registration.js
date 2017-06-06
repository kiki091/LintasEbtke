$(document).ready(function() {

	function storeData() {

		var vm = this
		var opt = {

			dataType : "json",
			beforeSend: function(){
                showLoadingData(true)
                vm.clearErrorMessage()
            },
            success: function(response) {
            	if (response.status == false) {
	                if(response.is_error_form_validation) {

	                    var message_validation = ''
	                    $.each(response.message, function(key, value){
	                        $('input[name="' + key.replace(".", "_") + '"]').focus();
	                        $("#form--error--message--" + key.replace(".", "_")).text(value)
	                        message_validation += '<li class="notif__content__li"><span class="text" >' + value + '</span></li>'
	                    });
	                    pushNotifMessage(response.status,response.message, message_validation);

	                } else {
	                    pushNotifV3(response.status, response.message);
	                }
	            } else {
	                vm.resetForm()
	                pushNotifV3(response.status, response.message);
	                $('.btn__add__cancel').click();
	            }
            },
            complete: function(response){
                hideLoading()
            }
		};
		$("#UserFormRegistration").ajaxForm(optForm);
        $("#UserFormRegistration").submit();
	}

	function clearErrorMessage(){
        $(".form--error--message").text('')
    }

    function resetForm() {

    	$('#fullname').val('')
    	$('#email').val('')
    	$('#password').val('')
    	$('#confirm_password').val('')
    }
})