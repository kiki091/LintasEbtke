function logout() {

	showLoading()

	$.get(laroute.route('sipeda_logout', []), function()
    {
    	hideLoading()
        $(location).prop('href', laroute.route('sipeda_logout', []));
    });

}