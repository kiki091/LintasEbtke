function menuGroup()
{
    $('.right_col').load(laroute.route('CmsMenuGroupManager', []), function()
    {
    	initMenuGroup()
    });
}