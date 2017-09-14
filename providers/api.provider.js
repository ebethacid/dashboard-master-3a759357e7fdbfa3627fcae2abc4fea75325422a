/*
 * handles the restful http request of the application
 */

(function(){
    'use strict';
    angular.module('dashboard.data').factory('ApiProvider', [
            'httpUtil',
            '$q',
        function(
            httpUtil,
            $q
        ){
            var self = this;

            self.canceller = null;

            self.getData = function(params, callback, errorCallback) {
                self.canceller = $q.defer();

                httpUtil({
                    'url' : params.url,
                    'method' : 'GET',
                    'data' : params,
                    'config' : {
                        'timeout' : self.canceller.promise
                    },
                    'success' : function(response, status, headers, config) {
                        callback(self.dataManager(response), status, headers, config);
                    },
                    'error' : function(response, status, headers, config) {
                        errorCallback(response, status, headers, config);
                    }
                });
            };
            
            self.dataManager = function(response) {
                var managedData = {
                    response_code: (response.data.response_code != undefined ? response.data.response_code : ''),
                    response_desc: (response.data.response_desc != undefined ? response.data.response_desc : ''),
                    data: (response.data.data != undefined ? response.data.data : {}),
                    error_message : (response.data.error_message != undefined ? response.data.error_message : '')
                };
                console.log(managedData);
                return managedData;
            }
            
            self.cancelLastCall = function() {
                self.canceller.resolve();
            };

            return {
                'getData' : self.getData,
                'cancelLastCall' : self.cancelLastCall
            };
       
        }]);
}());
