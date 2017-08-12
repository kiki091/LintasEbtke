// JAVASCRIPT MENU GROUP MANAGER

function menuCapacityBuilding()
{
    $('.right_col').load(laroute.route('sipeda_capacity_building', []), function()
    {
    	initMenuCapacityBuilding()
    });
}

function menuProyekPowerProducer()
{
    $('.right_col').load(laroute.route('sipeda_proyek_power_producer', []), function()
    {
    	initMenuProyekPowerProducer()
    });
}


function menuInvestasiPowerProducer()
{
    $('.right_col').load(laroute.route('sipeda_investasi_power_producer', []), function()
    {
    	initMenuInvestasiPowerProducer()
    });
}



function menuInvestasiPabrikanAnekaEbt()
{
    $('.right_col').load(laroute.route('sipeda_investasi_pabrikan_aneka_ebt', []), function()
    {
        initMenuInvestasiPabrikanAnekaEbt()
    });
}



function menuInvestasiPltsRooftop()
{
    $('.right_col').load(laroute.route('sipeda_investasi_plts_rooftop', []), function()
    {
        initMenuInvestasiPltsRooftop()
    });
}
