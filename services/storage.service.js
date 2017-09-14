/*
 *  service for storing data in local storage
 */

(function()
{
    'use strict';
    angular.module('dashboard.data').service('StorageService', [
           
        function(
           
        ){
            var self = this;
            self.setLocalStorage = function(key, value){
                var obj = JSON.parse(localStorage.getItem("locData"));
                if (!obj)
                    obj = {};
                obj[key] = (typeof value === 'object' ? JSON.stringify(value) : value);
                localStorage.setItem("locData", JSON.stringify(obj));
            };
            
            self.getLocalStorage = function(key){
                var obj = JSON.parse(localStorage.getItem("locData"));
                if (!obj)
                    return '';
                return obj[key];
            };
            
            self.clearLocalStorage = function(){
                localStorage.removeItem("locData");
            };
            
            return {
                setLocalStorage:   self.setLocalStorage,
                getLocalStorage:   self.getLocalStorage,
                clearLocalStorage: self.clearLocalStorage
            };
            
            
        }]);
}());
