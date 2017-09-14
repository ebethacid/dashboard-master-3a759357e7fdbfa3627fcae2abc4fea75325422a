/*
 * handles the sign up in home page
 */

(function()
{
    'use strict';
    angular.module('dashboard.app').controller('HomeController', [
            '$scope',
            '$location',
            'StorageService',
            'DataService',
            'AuthService',
            'ValidationService',
            'MsgService',
        function(
            scope,
            location,
            StorageService,
            DataService,
            AuthService,
            ValidationService,
            MsgService
        ){
            console.log("HomeController");
            scope.locData = {};
            scope.result = {};
            
            scope.init = function(){
                DataService.init(
                    StorageService.getLocalStorage("username"), 
                    StorageService.getLocalStorage("token"),
                    StorageService.getLocalStorage("type"),
                    StorageService.getLocalStorage("balance")
                );
                scope.locData.username = DataService.getUsername();
                scope.locData.type = DataService.getType();
                scope.locData.balance = DataService.getBalance();
                scope.locData.account = MsgService.getMsg(scope.locData.type + " account label");
                scope.locData.isLoggedIn = DataService.isLoggedIn();
            };
            
            scope.signOutUser = function(){
                AuthService.logout(function(){
                    AuthService.setUrlPath("/");
                });
            };
            
            scope.signUpUser = function(){
                scope.result = {};
                console.log(scope.locData);
                if (!ValidationService.isEmpty(scope.locData.email)) {
                    DataService.setPageName('signup');
                    DataService.setPageData({
                        email: scope.locData.email
                    });
                    
                    location.path("/create");
                } else {
                    scope.result = {
                        email: {
                            style: 'invalid'
                        },
                        style: 'error-msg',
                        message: [MsgService.getMsg('empty email msg')]
                    };
                }
            };
            
            scope.init();
    }]);
}());
