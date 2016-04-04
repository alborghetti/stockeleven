'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('MainCtrl', function ($scope, $window) {
	$scope.$back = function() { 
		$window.history.back();
		$scope.$apply();
	};   
  });