(function () {

    var laroute = (function () {

        var routes = {

            absolute: false,
            rootUrl: 'http://localhost',
            routes : [{"host":null,"methods":["GET","HEAD"],"uri":"api\/user","name":null,"action":"Closure"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"\/","name":"MainPage","action":"App\Http\Controllers\Ebtke\Front\Pages\MainController@index"},{"host":"lintas.ebtke.dev","methods":["POST"],"uri":"contact-us","name":"StoreContactUs","action":"App\Http\Controllers\Ebtke\Front\Pages\ContactUsController@store"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"news","name":"landingNews","action":"App\Http\Controllers\Ebtke\Front\Pages\NewsController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"news\/detail\/{slug}","name":"detailNews","action":"App\Http\Controllers\Ebtke\Front\Pages\NewsController@detail"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"news\/tags\/{slug}","name":"NewsByCategory","action":"App\Http\Controllers\Ebtke\Front\Pages\NewsController@getNewsByCategory"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"event","name":"landingEvent","action":"App\Http\Controllers\Ebtke\Front\Pages\EventController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"event\/data","name":"GetDataEvent","action":"App\Http\Controllers\Ebtke\Front\Pages\EventController@getData"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"event\/detail\/{slug}","name":"detailEvent","action":"App\Http\Controllers\Ebtke\Front\Pages\EventController@detail"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"company\/history","name":"CompanyHistory","action":"App\Http\Controllers\Ebtke\Front\Pages\CompanyController@history"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"company\/vision-and-mission","name":"CompanyVisionMission","action":"App\Http\Controllers\Ebtke\Front\Pages\CompanyController@visionMision"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"company\/organization-structure","name":"CompanyOrganization","action":"App\Http\Controllers\Ebtke\Front\Pages\CompanyController@organizationStructure"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"company\/scope-of-services","name":"CompanyScope","action":"App\Http\Controllers\Ebtke\Front\Pages\CompanyController@scopeServices"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"white-papers","name":"WhitePapers","action":"App\Http\Controllers\Ebtke\Front\Pages\WhitePaperController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"white-papers\/{slug}","name":"DetailWhitePapers","action":"App\Http\Controllers\Ebtke\Front\Pages\WhitePaperController@detail"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services","name":"InvestmentServicesLanding","action":"App\Http\Controllers\Ebtke\Front\Pages\InvestmentServicesController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/detail\/{slug}","name":"InvestmentServicesDetail","action":"App\Http\Controllers\Ebtke\Front\Pages\InvestmentServicesController@detail"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/potentials\/geothermal","name":"InvestmentServicesPotentialsGeothermalLanding","action":"App\Http\Controllers\Ebtke\Front\Pages\GeothermalController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/potentials\/geothermal\/maps","name":"InvestmentServicesPotentialsGeothermal","action":"App\Http\Controllers\Ebtke\Front\Pages\GeothermalController@maps"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/potentials\/bio-energy","name":"InvestmentServicesPotentialsBioEnergy","action":"App\Http\Controllers\Ebtke\Front\Pages\BioEnergyController@maps"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/potentials\/other","name":"InvestmentServicesPotentialsOther","action":"App\Http\Controllers\Ebtke\Front\Pages\PotentialController@other"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/potentials\/energy-conservation","name":"InvestmentServicesPotentialsEnergyConservation","action":"App\Http\Controllers\Ebtke\Front\Pages\EnergyConservationController@maps"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/green-pages","name":"InvestmentServicesGreenPages","action":"App\Http\Controllers\Ebtke\Front\Pages\GreenPagesController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/green-pages\/detail\/{slug}","name":"InvestmentServicesGreenPagesDetail","action":"App\Http\Controllers\Ebtke\Front\Pages\GreenPagesController@detail"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"investment-services\/procedure","name":"InvestmentServicesProcedure","action":"App\Http\Controllers\Ebtke\Front\Pages\ProcedureController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"tools","name":"Tools","action":"App\Http\Controllers\Ebtke\Front\Pages\ToolsController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"tools\/{slug}","name":"ToolsDetail","action":"App\Http\Controllers\Ebtke\Front\Pages\ToolsController@detail"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"information-services\/renewable-energi\/industry","name":"IndusrtiLanding","action":"App\Http\Controllers\Ebtke\Front\Pages\IndustriController@landing"},{"host":"lintas.ebtke.dev","methods":["GET","HEAD"],"uri":"information-services\/renewable-energi\/industry\/detail\/{slug}","name":"IndusrtiDetail","action":"App\Http\Controllers\Ebtke\Front\Pages\IndustriController@detail"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"\/","name":"login","action":"App\Http\Controllers\Ebtke\Cms\MainController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"register","name":"register","action":"App\Http\Controllers\Ebtke\Cms\AuthController@register"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"registered","name":"registered","action":"App\Http\Controllers\Ebtke\Cms\AuthController@registered"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"auth","name":"authenticate","action":"App\Http\Controllers\Ebtke\Cms\AuthController@authenticate"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"change-password","name":"ChangePassword","action":"App\Http\Controllers\Ebtke\Cms\AuthController@changePassword"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"logout","name":"logout","action":"App\Http\Controllers\Ebtke\Cms\AuthController@logout"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"user","name":"CmsDashboardPage","action":"App\Http\Controllers\Ebtke\Cms\Pages\DashboardController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"user\/news","name":"CmsNewsIndex","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"user\/news\/data","name":"CmsNewsGetData","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@getData"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/store","name":"CmsNewsStoreData","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@store"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/edit","name":"CmsNewsEditData","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@edit"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/change-status","name":"CmsNewsChangeStatus","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@changeStatus"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/delete","name":"CmsNewsDeleteData","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@delete"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/order","name":"CmsNewsOrderData","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@order"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/edit-slider","name":"CmsNewsEditImageSlider","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@editImageSlider"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"user\/news\/delete-slider","name":"CmsNewsDeleteImageSlider","action":"App\Http\Controllers\Ebtke\Cms\Pages\NewsController@deleteImageSlider"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/menu-group","name":"CmsMenuGroupManager","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\MenuGroupController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/menu-group\/data","name":"CmsMenuGroupManagerGetData","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\MenuGroupController@getData"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"ams\/menu-group\/change-status","name":"CmsMenuGroupManagerChangeStatus","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\MenuGroupController@changeStatus"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/menu-navigation","name":"CmsMenuNavigation","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\MenuNavigationController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/menu-navigation\/data","name":"CmsMenuNavigationGetData","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\MenuNavigationController@getData"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"ams\/menu-navigation\/change-status","name":"CmsMenuNavigationChangeStatus","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\MenuNavigationController@changeStatus"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/sub-menu-navigation","name":"CmsSubMenuNavigation","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\SubMenuNavigationController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/sub-menu-navigation\/data","name":"CmsSubMenuNavigationGetData","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\SubMenuNavigationController@getData"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"ams\/sub-menu-navigation\/change-status","name":"CmsSubMenuNavigationChangeStatus","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\SubMenuNavigationController@changeStatus"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/user-account","name":"CmsUserAccount","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\UserAccountController@index"},{"host":"account.ebtke.dev","methods":["GET","HEAD"],"uri":"ams\/user-account\/data","name":"CmsUserAccountGetData","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\UserAccountController@getData"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"ams\/user-account\/change-status","name":"CmsUserAccountChangeStatus","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\UserAccountController@changeStatus"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"ams\/user-account\/store","name":"CmsUserAccountStoreData","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\UserAccountController@store"},{"host":"account.ebtke.dev","methods":["POST"],"uri":"ams\/user-account\/edit","name":"CmsUserAccountEditData","action":"App\Http\Controllers\Ebtke\Cms\Pages\Auth\UserAccountController@edit"}],
            prefix: '',

            route : function (name, parameters, route) {
                route = route || this.getByName(name);

                if ( ! route ) {
                    return undefined;
                }

                return this.toRoute(route, parameters);
            },

            url: function (url, parameters) {
                parameters = parameters || [];

                var uri = url + '/' + parameters.join('/');

                return this.getCorrectUrl(uri);
            },

            toRoute : function (route, parameters) {
                var uri = this.replaceNamedParameters(route.uri, parameters);
                var qs  = this.getRouteQueryString(parameters);

                if (this.absolute && this.isOtherHost(route)){
                    return "//" + route.host + "/" + uri + qs;
                }

                return this.getCorrectUrl(uri + qs);
            },

            isOtherHost: function (route){
                return route.host && route.host != window.location.hostname;
            },

            replaceNamedParameters : function (uri, parameters) {
                uri = uri.replace(/\{(.*?)\??\}/g, function(match, key) {
                    if (parameters.hasOwnProperty(key)) {
                        var value = parameters[key];
                        delete parameters[key];
                        return value;
                    } else {
                        return match;
                    }
                });

                // Strip out any optional parameters that were not given
                uri = uri.replace(/\/\{.*?\?\}/g, '');

                return uri;
            },

            getRouteQueryString : function (parameters) {
                var qs = [];
                for (var key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        qs.push(key + '=' + parameters[key]);
                    }
                }

                if (qs.length < 1) {
                    return '';
                }

                return '?' + qs.join('&');
            },

            getByName : function (name) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                        return this.routes[key];
                    }
                }
            },

            getByAction : function(action) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].action === action) {
                        return this.routes[key];
                    }
                }
            },

            getCorrectUrl: function (uri) {
                var url = this.prefix + '/' + uri.replace(/^\/?/, '');

                if ( ! this.absolute) {
                    return url;
                }

                return this.rootUrl.replace('/\/?$/', '') + url;
            }
        };

        var getLinkAttributes = function(attributes) {
            if ( ! attributes) {
                return '';
            }

            var attrs = [];
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    attrs.push(key + '="' + attributes[key] + '"');
                }
            }

            return attrs.join(' ');
        };

        var getHtmlLink = function (url, title, attributes) {
            title      = title || url;
            attributes = getLinkAttributes(attributes);

            return '<a href="' + url + '" ' + attributes + '>' + title + '</a>';
        };

        return {
            // Generate a url for a given controller action.
            // laroute.action('HomeController@getIndex', [params = {}])
            action : function (name, parameters) {
                parameters = parameters || {};

                return routes.route(name, parameters, routes.getByAction(name));
            },

            // Generate a url for a given named route.
            // laroute.route('routeName', [params = {}])
            route : function (route, parameters) {
                parameters = parameters || {};

                return routes.route(route, parameters);
            },

            // Generate a fully qualified URL to the given path.
            // laroute.route('url', [params = {}])
            url : function (route, parameters) {
                parameters = parameters || {};

                return routes.url(route, parameters);
            },

            // Generate a html link to the given url.
            // laroute.link_to('foo/bar', [title = url], [attributes = {}])
            link_to : function (url, title, attributes) {
                url = this.url(url);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given route.
            // laroute.link_to_route('route.name', [title=url], [parameters = {}], [attributes = {}])
            link_to_route : function (route, title, parameters, attributes) {
                var url = this.route(route, parameters);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given controller action.
            // laroute.link_to_action('HomeController@getIndex', [title=url], [parameters = {}], [attributes = {}])
            link_to_action : function(action, title, parameters, attributes) {
                var url = this.action(action, parameters);

                return getHtmlLink(url, title, attributes);
            }

        };

    }).call(this);

    /**
     * Expose the class either via AMD, CommonJS or the global object
     */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return laroute;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = laroute;
    }
    else {
        window.laroute = laroute;
    }

}).call(this);

