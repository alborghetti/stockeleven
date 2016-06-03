'use strict';
  /**
 * @ngdoc function
 * @name stockElevenApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of login page
 */
angular.module('stockElevenApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $firebaseAuth, $location) {

  		$rootScope.$emit('viewLoaded', {});

  		$scope.login = function () {
	  		$scope.vm.dataLoading = true;

			firebase.auth().signInWithEmailAndPassword( $scope.vm.email, $scope.vm.password).then(function(user) {
				$scope.$apply(function () {
					$scope.vm.dataLoading = false;
        			if ( !user.emailVerified) {
        				$scope.vm.error = true;
        				$scope.vm.errorMessage = "email not verified yet";
        				$scope.vm.send = true;
        			} else {
        				$scope.vm.error = false;
        				$location.path('/app');
        			}
				});
			}, function(error){
				$scope.$apply(function () {
					$scope.vm.error = true;
					$scope.vm.errorMessage = error.message;
					$scope.vm.dataLoading = false;
				});
			});
	  	};

	  	$scope.send = function () {
	  		var user = firebase.auth().currentUser;
	  		user.sendEmailVerification();
	  		//Todo: popup for mail sent
	  	};

  });