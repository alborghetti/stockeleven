'use strict';

/**
 * @ngdoc overview
 * @name stockElevenApp
 * @description
 * # stockElevenApp
 *
 * Main module of the application.
 */
angular
  .module('stockElevenApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/listItalia', {
        templateUrl: 'views/listItalia.html',
        controller: 'ListItaliaCtrl',
        controllerAs: 'listItalia'
      })
      .when('/listNasdaq', {
        templateUrl: 'views/listNasdaq.html',
        controller: 'ListNasdaqCtrl',
        controllerAs: 'listNasdaq'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
