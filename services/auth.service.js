/*
 * module for authorizing credentials into application
 */
 
(function(){
    'user strict';
    angular.module('dashboard.app').service('AuthService', [
            'ApiService',
            'StorageService',
            'ApiProvider',
            'signInUri',
        function(
            ApiService,
            StorageService,
            ApiProvider,
            signInUri
            ){
                var self = this;
                self.login = function(params, callback){
                    ApiService.getData([
                        {
                           'provider': ApiProvider.getData,
                           'params': {
                                url: signInUri,
                                username: params.username,
                                password: params.password
                            }
                        }
                   ]).then(function(response){
                        var result = response[0].data || {};
                        if(result.response_code === "200"){
                            StorageService.setLocalStorage("username", result.data.username);
                            StorageService.setLocalStorage("token", result.data.token);
                            StorageService.setLocalStorage("balance", result.data.balance);
                            StorageService.setLocalStorage("type", result.data.type);
                            callback(true, result);
                        } else {
                            callback(false, result);
                        }
                    }, function(errorResponse){
                       console.log(errorResponse);
                    });
                };
                
                self.logout = function(callback){
                    StorageService.clearLocalStorage();
                    callback();
                };
                
                self.setUrlPath = function(dest){
                    var base = document.location.origin;
                    var path = document.location.pathname;
                    path = path.split('/');
                    
                    if (dest === '/')
                    {
                        path[path.length-1] = "";
                    } else
                    {
                        path[path.length-1] = dest;
                    }
                    
                    document.location.href = base + path.join('/');
                };
               
               return {
                   login:      self.login,
                   logout:     self.logout,
                   setUrlPath: self.setUrlPath
               };
    }]);
}());
