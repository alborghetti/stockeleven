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
    'firebase',
    'duScroll',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/list/:listId/:date', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl',
        controllerAs: 'list'
      })
      .when('/demoList/:listId', {
        templateUrl: 'views/demoList.html',
        controller: 'DemoListCtrl',
        controllerAs: 'list'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/logout', {
        templateUrl: 'views/main.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/passwordRecovery', {
        templateUrl: 'views/passwordRecovery.html',
        controller: 'PasswordRecoveryCtrl',
        controllerAs: 'passwordRecovery'
      })
      .when('/app', {
        templateUrl: 'views/appHome.html',
        controller: 'AppHomeCtrl',
        controllerAs: 'appHome'
      })
      .when('/portfoliosStockEleven', {
        templateUrl: 'views/appPortfoliosStockEleven.html',
        controller: 'AppPortfoliosStockElevenCtrl',
        controllerAs: 'appPortfoliosStockEleven'
      })
      .when('/portfoliosStockEleven/:portfolioId', {
        templateUrl: 'views/portfolioStockEleven.html',
        controller: 'portfolioStockElevenCtrl',
        controllerAs: 'portfolioStockEleven'
      })
      .otherwise({
        controller : function(){
            window.location.replace('/404.html');
        },
        template : "<div></div>"
      });

  })
  .value('duScrollDuration', 2000);
