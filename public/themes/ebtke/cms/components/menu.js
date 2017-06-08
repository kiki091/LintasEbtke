function menuPasien()
{
    $('.right_col').load(laroute.url('/dashboard/pasien', []), function()
    {
    	initPasien()
    });
}