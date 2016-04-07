  'use strict';

  /**
   * @ngdoc function
   * @name stockElevenApp.controller:AppHomeCtrl
   * @description
   * # User area controller
   * Controller of the stockElevenApp
   */
   angular.module('stockElevenApp')
   .controller('AppHomeCtrl', function ($scope) {

    $scope.isLoggedIn = false;

   	var ref = new Firebase("https://stockeleven.firebaseio.com/");
    ref.onAuth(function(authData) {
      if (authData) {
        $scope.isLoggedIn = true;

      } else {
        $scope.isLoggedIn = false;
      }
    });


  });