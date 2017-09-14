/* 
 * initialize url value for dashboard app
 */

(function()
{
    'use strict';
    angular.module('dashboard.data')
        .value('baseUri', "/smsapiv5_integration")
        .value('templatesUri', "templates/")
        .value('signInUri', "source/login.json")
        .value('createUserUri', "source/create.json");
}());
