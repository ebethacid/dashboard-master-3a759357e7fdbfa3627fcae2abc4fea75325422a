/*
 * module that holds set of navigation or menu functionality that can be reuse within the application
 */
 
(function()
{
    'use strict';
    angular.module('dashboard.app').directive('topMenu', [
            '$location',
            'DataService',
            'templatesUri',
        function(
            location,
            DataService,
            templatesUri
            ){
                var self = {};
                self.link = function(scope, element, attrs){
                    scope.isLoggedIn = scope.locData.isLoggedIn;
                    scope.username = scope.locData.username;
                    scope.balance = scope.locData.balance;
                    scope.account = scope.locData.account;
                    scope.type = scope.locData.type;
                    
                    scope.login = function(){
                        location.path("/login");
                        DataService.setPageName("");
                        DataService.setPageData({});
                    };
                    
                    scope.signup = function(){
                        var path = document.location.pathname.split("/");
                        if (path[path.length-1] === "create"){
                            document.location.reload(true);
                        } else {
                            location.path("/create");
                        }
                    };
                    
                    scope.home = function(){
                        DataService.setPageName("");
                        DataService.setPageData({});
                        var path = document.location.pathname.split("/");
                        if (path[path.length-1] === ""){
                            document.location.reload(true);
                        } else {
                            location.path("/");
                        }
                    };
                };

                return {
                    'link': self.link,
                    'restrict': 'A',
                    'replace': true,
                    'scope': {
                        locData: '=' 
                    },
                    'templateUrl': function(element, attrs){
                        return templatesUri + attrs.templateUrl;
                    }
                };
        }]);
        
    angular.module('dashboard.app').directive('footer', [
            'templatesUri',
        function(
            templatesUri
            ){
            return {
                'restrict': 'A',
                'templateUrl': function(element, attrs){
                    return templatesUri + attrs.templateUrl;
                }
            };
        }]);
    
}());
