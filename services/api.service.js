/*
 * service that handles the calls and result of api call
 */

(function()
{
    'use strict';
    angular.module('dashboard.data').service('ApiService', [
            '$q',
        function(
            promise
        ){
            
            var self = this;
            self.deferred = [];
            self.getPromise = function(request) {
                var promiseIdx = self.deferred.length,
                    params = (request.params) ? request.params : {};
                    
                self.deferred.push(promise.defer());
                    
                request.provider(params, function(data, status, headers, config) {
                    return self.deferred[promiseIdx].resolve({
                        'data' : data,
                        'status' : status,
                        'headers' : headers,
                         'config' : config
                    });
                }, function(data, status, headers, config) {
                    return self.deferred[promiseIdx].reject({
                        'data' : data,
                         'status' : status,
                         'headers' : headers,
                         'config' : config
                    });
                });
                    
                return self.deferred[promiseIdx].promise;
            };
            self.getData = function(requestList) {
                var promises = [];
                
                angular.forEach(requestList, function(request) {
                    promises.push(self.getPromise(request));
                });
                
                return promise.all(promises);
            };
            
            return {
                deferred: self.deferred,
                getPromise: self.getPromise,
                getData: self.getData
            };
            
        }]);
}());
