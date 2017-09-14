/*
 * module for constructing messages or labels displayed in the application
 */
 
(function()
{
    'use strict';
    angular.module('dashboard.data').service('MsgService', [
    
        function(
        ){
            
            var self = this;
            self.FREE_ACCOUNT_LABEL = 'Trial Account';
            self.EMPTY_EMAIL_MSG = 'Please input a valid email address.';
            self.EMPTY_FIRSTNAME_MSG = 'Please input a valid first name.';
            self.EMPTY_LASTNAME_MSG = 'Please input a valid last name.';
            self.EMPTY_PASSWORD_MSG = 'Please input a valid password.';
            self.EMPTY_RETYPE_MSG = 'Please retype password.';
            self.SHORT_PASSWORD_MSG = 'The password is too short. Please use 8 or more characters.';
            self.INVALID_FIRSTNAME_MSG = 'Numeric and special characters are not allowed.';
            self.INVALID_LASTNAME_MSG = self.INVALID_FIRSTNAME_MSG;
            self.INVALID_EMAIL_MSG = self.EMPTY_EMAIL_MSG;
            self.INVALID_PASSWORD_MSG = self.EMPTY_PASSWORD_MSG;
            self.INVALID_RETYPE_MSG = self.EMPTY_RETYPE_MSG;
            self.UNMATCHED_PASSWORD_MSG = 'Password do not match.';
            self.UNMATCHED_RETYPE_MSG = self.UNMATCHED_PASSWORD_MSG;
            self.NOT_FOUND_MSG = 'User not found.';

            self.SIGNUP_SUCCESS_MSG = 'We have sent you an email for verification.';
            
            self.construct = function(name){
                var temp = name.split(" ");
                return temp.join("_").toUpperCase();
            };
            
            self.getMsg = function(name){
                var msg = self.construct(name);
                return self[msg];
            };
            
            return {
                getMsg: self.getMsg
            };
        
        }]);
}());
