/*
 * handles the http request
 */

(function() {
    'use strict';
    angular.module('dashboard.app').factory('httpUtil', [
        '$http',
        function(
            $http
        ) {
            var callAPI = function(requestHash) {
                var config = (requestHash.config) ? requestHash.config : {},
                    data = (requestHash.data) ? requestHash.data : {},
                    method = (requestHash.method) ? requestHash.method : 'GET',
                    headers = (requestHash.headers) ? requestHash.headers : '',
                    parameter = {
                        'method' : method,
                        'url' : requestHash.url
                    };
                
                if (method === 'GET') {
                    parameter.params = data;
                } else {
                    if (!config['headers']) {
                        config['headers'] = {};
                    }
                    
                    if (!headers)
                        config['headers']['Content-Type'] = 'application/x-www-form-urlencoded';
                    else
                        config['headers']['Content-Type'] = headers['Content-Type'];
                
                    
                    if (config['headers']['Content-Type'] == undefined)
                        parameter.data = data;
                    else
                        parameter.data = $.param(data);
                }
                
                $http(
                    angular.extend(parameter, config)
                ).then(function(data, status, headers, config) {
                    if (requestHash.success) {
                        requestHash.success(data, status, headers, config);
                    }
                }, function(data, status, headers, config) {
                    if (requestHash.error) {
                        requestHash.error(data, status, headers, config);
                    }
                });
            };
            
            return callAPI;
        }
    ]);
}());
