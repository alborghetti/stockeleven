'use strict';
  /**
 * @ngdoc function
 * @name stockElevenApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of login page
 */
angular.module('stockElevenApp')
  .controller('LoginCtrl', function ($scope, $firebaseAuth, $location) {

  		$scope.login = function () {
	  		$scope.vm.dataLoading = true;
	  		var ref = new Firebase("https://stockeleven.firebaseio.com/");

			ref.authWithPassword({
  				email    : $scope.vm.email,
				password : $scope.vm.password
			}, function (error, authData) {
			  if (error) {
			  	$scope.$apply(function () {
						$scope.vm.error = true;
						$scope.vm.errorMessage = error.message;
						$scope.vm.dataLoading = false;
				});
			  } else {
			    $scope.$apply(function () {
						$scope.vm.error = false;
						$scope.vm.dataLoading = false;
            			$location.path('/app');
				});
			  }
			});
	  	}

  });