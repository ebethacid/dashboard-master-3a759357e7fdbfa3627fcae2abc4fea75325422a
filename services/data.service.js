/*
 * constructs data object that is shareable between controllers
 */

(function()
{
    'use strict';
    angular.module('dashboard.data').service('DataService', [
        function(
            ){
                var self = this;
                self.data = {
                    username: '',
                    token: '',
                    type: '',
                    balance: ''
                };
                
                self.page = {
                    name: '',
                    data: {}
                };
                
                self.init = function(username, token, type, balance) {
                    self.data.username = username;
                    self.data.token = token;
                    self.data.type = type;
                    self.data.balance = balance;
                };
                
                self.getUsername = function(){
                    return self.data.username;
                };
                
                self.getToken = function(){
                    return self.data.token;
                };
                
                self.getType = function(){
                    return self.data.type;
                };
                
                self.getBalance = function(){
                    return self.data.balance;
                };
                
                self.getPageName = function(){
                    return self.page.name;
                };
                
                self.getPageData = function(){
                    return self.page.data;
                };
                
                self.setUsername = function(username){
                    self.data.username = username;
                };
                
                self.setToken = function(token){
                    self.data.token = token;
                };
                
                self.setType = function(type){
                    self.data.type = type;
                };
                
                self.setBalance = function(balance){
                    self.data.balance = balance;
                };
                
                self.setPageName = function(name){
                    self.page.name = name;
                };
                
                self.setPageData = function(data){
                    self.page.data = data;
                };
                
                self.isLoggedIn = function(){
                    return self.data.token != '';
                }
                
                return {
                    data:        self.data,
                    page:        self.page,
                    init:        self.init,
                    getUsername: self.getUsername,
                    getToken:    self.getToken,
                    getType:     self.getType,
                    getBalance:  self.getBalance,
                    getPageName: self.getPageName,
                    getPageData: self.getPageData,
                    setUsername: self.setUsername,
                    setToken:    self.setToken,
                    setType:     self.setType,
                    setBalance:  self.setBalance,
                    setPageName: self.setPageName,
                    setPageData: self.setPageData,
                    isLoggedIn:  self.isLoggedIn
                };
        }]);
}());
