// JAVASCRIPT MENU GROUP MANAGER

function menuCapacityBuilding()
{
    $('.right_col').load(laroute.route('sipeda_capacity_building', []), function()
    {
    	initMenuCapacityBuilding()
    });
}
