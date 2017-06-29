// JAVASCRIPT MENU GROUP MANAGER

function menuGroup()
{
    $('.right_col').load(laroute.route('CmsMenuGroupManager', []), function()
    {
    	initMenuGroup()
    });
}

// JAVASCRIPT USER ACCOUNT MANAGER

function menuUserAccount()
{
    $('.right_col').load(laroute.route('CmsUserAccount', []), function()
    {
    	initUserAccount()
    });
}