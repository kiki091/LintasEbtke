// JAVASCRIPT MENU GROUP MANAGER

function menuGroup()
{
    $('.right_col').load(laroute.route('CmsMenuGroupManager', []), function()
    {
    	initMenuGroup()
    });
}

// JAVASCRIPT MENU NAVIGATION MANAGER

function menuNavigation()
{
    $('.right_col').load(laroute.route('CmsMenuNavigation', []), function()
    {
    	initMenuNavigation()
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