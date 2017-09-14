/* 
 * configure the routes of dashboard application
 */

(function()
{
    'use strict';
    angular.module('dashboard.app')

    .config([
        '$routeProvider',
        '$locationProvider',
        function(routeProvider, locationProvider){
            routeProvider
            .when('/', {
                templateUrl: 'home/index.view.html',
                controller: 'HomeController'
            })
            .when('/login', {
                templateUrl: 'signin/index.view.html',
                controller: 'SignInController'
            })
            .when('/create', {
                templateUrl: 'signup/index.view.html',
                controller: 'SignUpController'
            })
            .otherwise({
                redirectTo: '/'
            });
            
            locationProvider.html5Mode(true);
            locationProvider.hashPrefix('');
        }])

    .run(['$rootScope', '$location', 'StorageService', function(rootScope, loc, StorageService){
            /*rootScope.$on('destroy', function(){
                window.onbeforeunload = undefined;
            });*/

            rootScope.$on('$locationChangeStart', function(event, next, previous){
                //console.log("=");
                if (StorageService.getLocalStorage("token")){
                    
                    if (loc.path() === '/login' || loc.path() === '/create'){
                        
                        if (navigator.userAgent.search("Chrome") > 0 || navigator.userAgent.search("Firefox") > 0){
                            loc.path("/");
                            //document.location.reload(true);
                        } else {
                            var path = document.location.pathname.split("/");
                            path[path.length-1] = "";
                            document.location.href = document.location.origin + path.join("/");
                        }
                    }
                }
                //rootScope.routeName = loc.path();
            });

            /*rootScope.$on('$routeChangeStart', function(){
                console.log("#");
            });*/
        }]);
}());
