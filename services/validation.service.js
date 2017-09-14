/*
 * module for creating validations
 */
 
(function(){
    'use strict';
    angular.module('dashboard.data').service('ValidationService', [
        function(
        ){
            var self = this;
            self.isEmpty = function(value){
                if (typeof value === 'object') value = Object.keys(value).length;
                return (value === '' || value === null || value === undefined || value === 0);
            };
            
            self.isValidEmail = function(value){
                var regex = /^([a-zA-Z0-9]+)([\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\{\}\|\[\]\:\"\;\'\,\.\?]+)?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g;
                return (regex.test(value));
            };
            
            self.isValidName = function(value){
                var regex = /^[a-zA-Z][a-zA-Z\s\.\\\/]{1,139}$/g;
                return (regex.test(value));
            };
            
            self.isValidPassword = function(value){
                var regex = /^[a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\{\}\[\]\|\:\"\;\'\,\.\?]{8,140}$/g;
                return (regex.test(value));
            };
            
            self.isValidInput = function(obj, required){
                var isValid = true; // true if at least one value is invalid 
                var result = {};
                
                angular.forEach(required, function(value){
                    if (self.isEmpty(obj[value])){
                        result[value] = 'empty'; // records the type of error
                        isValid = false;
                    } else {
                        if (value === 'firstname' || value === 'lastname'){
                           if (!self.isValidName(obj[value])){
                                result[value] = 'invalid';
                                isValid = false;
                           }
                        }

                        if (value === 'email'){
                           if (!self.isValidEmail(obj[value])){
                                result[value] = 'invalid';
                                isValid = false;
                           }
                        }

                        if (value === 'password'){
                            if (obj[value].length < 8){
                                result[value] = 'short';
                                isValid = false;
                            } else if (!self.isValidPassword(obj[value])){
                                result[value] = 'invalid';
                                isValid = false;
                            }
                        }

                        // check if user has retyped the password correctly
                        /*if (required.indexOf('retype') > -1){
                            if (value === 'password' && obj[value] !== obj['retype']) {
                                result[value] = 'unmatched';
                                isValid = false;
                            }

                            if (value === 'retype' && obj[value] !== obj['password']) {
                                result[value] = 'unmatched';
                                isValid = false;
                            }
                        }*/
                    }
                });
                console.log(result);
                return {
                        isValid: isValid,
                        result: result
                };
            };
            
            return {
                isEmpty: self.isEmpty,
                isValidEmail: self.isValidEmail,
                isValidName: self.isValidName,
                isValidPassword: self.isValidPassword,
                isValidInput: self.isValidInput
            };
        }]);
}());
