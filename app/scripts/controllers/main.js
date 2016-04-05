'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('MainCtrl', function ($scope, $window, $firebaseAuth) {

	$scope.$back = function() { 
		$window.history.back();
		$scope.$apply();
	};

	var ref = new Firebase("https://stockeleven.firebaseio.com/");
	ref.onAuth(function(authData) {
		if (authData) {
			$scope.isLoggedIn = true;
			
		} else {
			$scope.isLoggedIn = false;
		}
	});

  });