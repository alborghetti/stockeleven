	  'use strict';
	   /**
	 * @ngdoc function
	 * @name stockElevenApp.controller:RegisterCtrl
	 * @description
	 * # RegisterCtrl
	 * Controller of registration page
	 */
	 angular.module('stockElevenApp')
	 .controller('RegisterCtrl', function ($scope, $firebaseAuth, $rootScope) {

	 	$rootScope.$emit('viewLoaded', {});

	 	$scope.registerTmp = function () {
	 		$scope.vm.error = true;
	 		$scope.vm.errorMessage = "This application is still in development - stay tuned!";

	 	};

	 	$scope.register = function () {
	 		$scope.vm.dataLoading = true;
	 		var ref = new Firebase("https://stockeleven.firebaseio.com/");

	 		ref.createUser({
	 			email    : $scope.vm.email,
	 			password : $scope.vm.password
	 		}, function(error, userData) {
	 			if (!error) {

	 				ref.authWithPassword({
	 					email    : $scope.vm.email,
	 					password : $scope.vm.password
	 				}, function(error, authData) {
	 					if (!error) {
	 						ref.child("users").child(userData.uid).set({
	 							firstName: $scope.vm.firstName,
	 							lastName: $scope.vm.lastName
	 						});
			 				$scope.$apply(function() {
			 					$scope.vm.created = true;
			 					$scope.vm.error= false;
			 					$scope.vm.dataLoading = false;
			 				});
	 					} else {
	 						$scope.vm.error = true;
	 						$scope.vm.created = false;
	 						$scope.vm.errorMessage = error.message;
	 						$scope.vm.dataLoading = false;
	 					}
	 				})


	 			} else {
	 				$scope.$apply(function() {
	 					$scope.vm.error = true;
	 					$scope.vm.created = false;
	 					$scope.vm.errorMessage = error.message;
	 					$scope.vm.dataLoading = false;
	 				});
	 			}

	 		});
	 	}

	 });