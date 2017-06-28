function logout() {

	showLoading()

	$.get(laroute.route('logout', []), function()
    {
    	hideLoading()
        $(location).prop('href', laroute.route('login', []));
    });

}