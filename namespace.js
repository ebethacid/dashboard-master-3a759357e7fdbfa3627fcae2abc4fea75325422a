 /*
  *  Organizes the modules for dashboard
 */

(function()
{
    'use strict';
    angular.module('dashboard.data', []);
    angular.module('dashboard.app', [
        'dashboard.data',
        'ngRoute',
        'ngSanitize'
    ]);
}());
