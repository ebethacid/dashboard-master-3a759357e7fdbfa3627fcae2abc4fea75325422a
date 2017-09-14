(function()
{
    'use strict';
    angular.module('dashboard.app').controller('SignInController', [
            '$scope',
            '$location',
            'AuthService',
            'ValidationService',
            'MsgService',
        function(
            scope,
            location,
            AuthService,
            ValidationService,
            MsgService
        ){
            console.log("SignInController");
            scope.locData = {};
            scope.credentials = {};
            scope.result = {};
            
            scope.signInUser = function(){
                var fields = ['email', 'password']; // list of required input fields
                var validator = ValidationService.isValidInput(scope.credentials, fields); // validates user input
                scope.result = {}; // reset the messages of the result / status of user's login

                if (validator.isValid){
                    console.log('valid input');
                    AuthService.login(scope.credentials, function(status, result){
                        if (status){
                            // redirect to dashboard
                            AuthService.setUrlPath("/");
                        } else {
                            scope.result['style'] = 'error-msg'; // set the style to display the error message
                            scope.result['message'] = [MsgService.getMsg(result.error_message)]; 
                            // get the message defined in message service based on the api response
                        }
                    });
                } else {
                    console.log("invalid input");
                    console.log(validator.result);

                    angular.forEach(fields, function(idx){
                        scope.result[idx] = {};
                        if (validator.result[idx] !== undefined){ // checks field that has error
                            scope.result[idx]['message'] = MsgService.getMsg(validator.result[idx] + " " + idx + " msg");
                            scope.result[idx]['style'] = 'invalid';
                            scope.result[idx]['class'] = 'field-error';
                        }
                    });
                }
            }; 
            
            scope.signUpUser = function(){
                location.path("/create");
            };
            
    }]);
}());
