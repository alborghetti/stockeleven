  'use strict';

  /**
   * @ngdoc function
   * @name stockElevenApp.controller:AppHomeCtrl
   * @description
   * # User area controller
   * Controller of the stockElevenApp
   */
   angular.module('stockElevenApp')
   .controller('AppHomeCtrl', function ($scope, $routeParams) {

   	var ref = new Firebase("https://stockeleven.firebaseio.com/"+$routeParams.userId);


  });