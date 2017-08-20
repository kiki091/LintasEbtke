$(document).ready(function() {

	$('#form__contact__us').submit(function(event) {

		event.preventDefault();

		var url       = window.location.origin;
		var domain    = $('#form__contact__us').attr('action');
        var values    = $(this).serialize();

        $.ajax({

        	url: domain,
        	type: "POST",
        	data: values,

        	success: function (data, response) {
                
        		if (data.status == false) {

        			if(data.is_error_form_validation == true) {
                        $('.form--error--message').show()
        				
                        $.each(data.message, function(key, value){
                            $('input[name="' + key.replace(".", "_") + '"]').focus();
                            $("#form--error--" + key.replace(".", "_")).text(value)
                        });

                        toastr.error('Please check your input required')

        			} else {
                        
                        toastr.error('Error, please check your input required')
                    }

        		} else {

        			$('.form--error--message').hide()
                    $('.ac-container').addClass('hide__element')
                    
                    toastr.success(data.message)
        		}
        	},
            error: function(jqXHR, textStatus, errorThrown) {
               
                
                toastr.success(textStatus)
            }
        });
	});
});