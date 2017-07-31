$(document).ready(function() {

	$('#UserFormRegistration').on('submit',function(event) {
		event.preventDefault()

		var url = $('#UserFormRegistration').attr('action')
		var data = $(this).serialize()

		$.ajax({

			type : "POST",
			dataType : "json",
			url : url,
			data : data,

			beforeSend: function(){
				$('#submit__button').prop("disabled", true)
                showLoading(true)
                clearErrorMessage()
            },

			success: function(data) {
				
				if (data.status == false) {
	                if(data.is_error_form_validation) {

	                    $.each(data.message, function(key, value){
	                        $('input[name="' + key.replace(".", "_") + '"]').focus();
	                        $("#form--error--message--" + key.replace(".", "_")).text(value)
	                        
                			$('#submit__button__registration').prop("disabled", false)
	                    });

	                } else {
	                    pushNotif(data.status, data.message);
                		$('#submit__button__registration').prop("disabled", false)
	                }
	            } else {
	                resetForm()
	                pushNotif(data.status, data.message);
	                $('#close__button').click();
	            }
			},
            complete: function(response){
                hideLoading()
                $('#submit__button__registration').prop("disabled", false)
            }
		});
	});

	function clearErrorMessage(){
        $(".form--error--message").text('')
    }

    function resetForm() {

    	$('#nama_perusahaan').val('')
    	$('#email').val('')
    	$('#npwp').val('')
    	$('#pimpinan_perusahaan').val('')
    	$('#kepemilikan_saham').val('')
    	$('#pic_name').val('')
    	$('#pic_phone_number').val('')
    	$('#pic_email').val('')
    }
})