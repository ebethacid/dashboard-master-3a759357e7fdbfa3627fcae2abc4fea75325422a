(function(){
    'use strict';
    angular.module('dashboard.app').service('SignUpService', [
            'ApiService',
            'ApiProvider',
            'DataService',
            'createUserUri',
        function(
            ApiService,
            ApiProvider,
            DataService,
            createUserUri
        ){
            var self = this;
            self.createUser = function(params, callback){
                ApiService.getData([
                    {
                        'provider': ApiProvider.getData,
                        'params': {
                            url: createUserUri,
                            email: params.email,
                            firstname: params.firstname,
                            lastname: params.lastname,
                            password: params.password
                        }
                    }
                ]).then(function(response){
                    var result = response[0].data || {};
                    if(result.response_code === "200"){
                        callback(true, result);
                    } else {
                        callback(false, result);
                    }
                }, function(errorResponse){
                    console.log(errorResponse);
                });
            };
            
            return {
                createUser: self.createUser
            };
        }]);
}());
