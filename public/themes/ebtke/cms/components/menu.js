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

// JAVASCRIPT SUB MENU NAVIGATION MANAGER

function menuSubNavigation()
{
    $('.right_col').load(laroute.route('CmsSubMenuNavigation', []), function()
    {
    	initSubMenuNavigation()
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

// JAVASCRIPT NEWS CONTENT MANAGER

function menuNews()
{
    $('.right_col').load(laroute.route('CmsNewsIndex', []), function()
    {
        initNewsContent()
    });
}

// JAVASCRIPT EVENT CONTENT MANAGER

function menuEvent()
{
    $('.right_col').load(laroute.route('CmsEventIndex', []), function()
    {
        initEventContent()
    });
}

// JAVASCRIPT COMPANY HISTORY CONTENT MANAGER

function menuLintasHistory()
{
    $('.right_col').load(laroute.route('CompanyHistoryIndex', []), function()
    {
        initCompanyHistory()
    });
}


// JAVASCRIPT GREEN PAGES CATEGORY CONTENT MANAGER

function menuGreenPagesCategory()
{
    $('.right_col').load(laroute.route('GreenPagesCategoryIndex', []), function()
    {
        initGreenPagesCategory()
    });
}


// JAVASCRIPT GREEN PAGES CONTENT MANAGER

function menuGreenPages()
{
    $('.right_col').load(laroute.route('GreenPagesIndex', []), function()
    {
        initGreenPages()
    });
}



// JAVASCRIPT INVESTMENT SERVICES CONTENT MANAGER

function menuInvestmentServices()
{
    $('.right_col').load(laroute.route('InvestmentServicesIndex', []), function()
    {
        initInvestmentServices()
    });
}