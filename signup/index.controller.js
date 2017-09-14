/*
* SignUpController:
* a. set initial state of scope (holds properties that will be presented by the view)
* - credentials = holds the user's input
* b. add behavior that react / responds to user's activity in the view
* - signUpUser = validates user's input and send it
* - signInUser = helps user to navigate to sign in page
*/

(function(){
    'use strict';
    angular.module('dashboard.app').controller('SignUpController', [
            '$scope',
            '$location',
            'DataService',
            'ValidationService',
            'SignUpService',
            'MsgService',
        function(
            scope,
            location,
            DataService,
            ValidationService,
            SignUpService,
            MsgService
        ){
            console.log("SignUpController");
            var data = DataService.getPageData(); // get the data set by other controller (i.e. home controller)
            var regex = { // defines regex to get the lower case, upper case, number, and special string in password
                lower:   /[a-z]+/g,
                upper:   /[A-Z]+/g,
                number:  /[0-9]+/g,
                special: /[\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\{\}\|\[\]\:\"\;\'\,\.\?]+/g
            };
            var addElement = function(array, value){
                if (array.indexOf(value) < 0)
                    array.push(value);
                return array;
            };
            var delElement = function(array, value){
                if (array.indexOf(value) > -1)
                    array.splice(array.indexOf(value), 1);
                return array;
            };

            // scope properties that are tied to the view
            // scope property that contains the credentials (ie. email, name, password) of the user
            scope.credentials = {
                email: data.email
            };
            // scope property that defines the password view
            scope.password = {
                state: 'SHOW',
                type: 'password',
                meter: '',
                min: 8,
                message: "Your password must be at least 8 characters  length."
            };
            scope.fields = ['email', 'firstname', 'lastname', 'password']; // list of  required input fields
            scope.locData = {}; // holds data that is used for navigation directive (top menu bar)
            scope.result = {}; // holds the messages and styles to be displayed in the view
            scope.filled = []; // holds the fields that are filled

            // watch the required fields change
            scope.$watch('credentials', function(newValue){
                if (!ValidationService.isEmpty(scope.credentials.email)){
                    scope.filled = addElement(scope.filled, 'email');
                } else {
                    scope.filled = delElement(scope.filled, 'email');
                }

                if (!ValidationService.isEmpty(scope.credentials.firstname)){
                    scope.filled = addElement(scope.filled, 'firstname');
                } else {
                    scope.filled = delElement(scope.filled, 'firstname');
                }

                if (!ValidationService.isEmpty(scope.credentials.lastname)){
                    scope.filled = addElement(scope.filled, 'lastname');
                } else {
                    scope.filled = delElement(scope.filled, 'lastname');
                }

                if (!ValidationService.isEmpty(scope.credentials.password)){
                    scope.filled = addElement(scope.filled, 'password');
                } else {
                    scope.filled = delElement(scope.filled, 'password');
                }
            }, true);

            // watch the changes in password property
            scope.$watch('credentials.password', function(newValue){
                var flag = 0; // increment when there's lower, upper, number, and special character in password
                if (newValue !== undefined) {
                    // evaluates password complexity if not empty and it's length is at least 8 characters
                    if (!ValidationService.isEmpty(newValue) && newValue.length >= scope.password.min){
                        scope.result = {};
                        // go through the dictionary of regex
                        angular.forEach(regex, function(r){
                            var str = newValue.replace(r, ":");
                            // check if there's match in password string then increment the flag
                            if ((str.match(/:/g)||[]).length > 0)
                                flag++;
                        });
                    }
                }
                // defines password meter based on the number of regex it matched
                switch(flag){
                    case 1:
                        scope.password.meter = 'weak';
                    break;
                    case 2:
                        scope.password.meter = 'fair';
                    break;
                    case 3:
                        scope.password.meter = 'good';
                    break;
                    case 4:
                        scope.password.meter = 'strong';
                    break;
                    default:
                        scope.password.meter = '';
                }
            });
            
            // when the user leaves the password field this function checks if the field is blank or valid in length
            scope.watchField = function(field){
                if (scope.credentials[field] !== undefined && scope.credentials[field].length < scope.password.min){
                    if (scope.result['password'] === undefined) scope.result['password'] = {};
                    scope.result['password']['message'] = MsgService.getMsg("short "+field+" msg");
                    scope.result['password']['class'] = 'field-error';
                    scope.result['password']['style'] = 'invalid';
                }
            };
            
            scope.toggle = function(name){
                // if the current state is show then change it to hide and make the input type to text
                if (scope.password.state === 'SHOW'){
                    scope.password.state = 'HIDE';
                    scope.password.type = 'text';
                } else {
                    scope.password.state = 'SHOW';
                    scope.password.type = 'password';
                }
            };
            
            // when the user submit the form
            scope.signUpUser = function(){
                var validator = ValidationService.isValidInput(scope.credentials, scope.fields); // validates the inputs
                scope.result = {}; // reset the messages of the result / status of user's signup

                if (validator.isValid){
                    console.log("valid input");
                    
                    SignUpService.createUser(scope.credentials, function(status, result){
                        if (status){
                            scope.password['state'] = 'SHOW';
                            scope.password['type'] = 'password';
                            scope.password['meter'] = '';
                            scope.result['style'] = 'success-msg';
                            scope.result['message'] = [MsgService.getMsg("signup success msg")]; 
                        } else {
                            scope.result['style'] = 'error-msg'; // set the style to display the error message
                            scope.result['message'] = [MsgService.getMsg(result.error_message)]; 
                            // get the message defined in message service based on the api response
                        }
                    });
                } else {
                    console.log("invalid input");
                    console.log(validator.result);

                    angular.forEach(scope.fields, function(idx){
                        scope.result[idx] = {};
                        if (validator.result[idx] !== undefined){ // checks field that has error
                            scope.result[idx]['message'] = MsgService.getMsg(validator.result[idx] + " " + idx + " msg");
                            scope.result[idx]['style'] = 'invalid';
                            scope.result[idx]['class'] = 'field-error';
                        }
                    });
                }

                console.log(scope.result);
            };
            
            scope.signInUser = function(){
                location.path("/login");
            };
            
        }]);
}());
