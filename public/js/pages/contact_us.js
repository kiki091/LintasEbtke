$(document).ready(function() {

	$('#form__contact__us').submit(function(event) {

		event.preventDefault();
		$('#submit__form__contact__us').prop("disabled", true);

		var url       = window.location.origin;
		var domain    = $('#form__contact__us').attr('action');
        var values    = $(this).serialize();

        $.ajax({

        	url: domain,
        	type: "POST",
        	data: values,

        	success: function (data, response) {
                console.log(data)
        		if (data.status == false) {

        			if(data.is_error_form_validation == true) {
                        $('.form--error--message').show()
        				
                        $.each(data.message, function(key, value){
                            $('input[name="' + key.replace(".", "_") + '"]').focus();
                            $("#form--error--" + key.replace(".", "_")).text(value)
                        });
        			}

        		} else {

        			$('.form--error--message').hide()
        		}

        		$('.submit__form__contact__us').prop("disabled", false);

        	},
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
	});
});