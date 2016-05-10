'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('MainCtrl', function ($scope, $rootScope, $window, $firebaseAuth, $location, $anchorScroll, $document) {

		$scope.dataLoading = true;

		$rootScope.$on('viewLoaded', function (event, args) {
			$scope.navbarCollapsed = true;
		});

		$rootScope.$emit('viewLoaded');

		$scope.isActive = function (route) {
			return route === $location.path();
    }

		$scope.toTheTop = function () {
			$document.duScrollTop(0, 2000);
    };

		$scope.slide = function (dir) {
			$('#myCarousel').carousel(dir);
		};

		var ref = new Firebase("https://stockeleven.firebaseio.com/");
		ref.onAuth(function (authData) {
			if (authData) {
				ref = new Firebase("https://stockeleven.firebaseio.com/users/" + authData.uid);
				ref.once("value", function (snapshot) {
					var snapshotUser = snapshot.val();

					$scope.$apply(function () {
						$scope.userName = snapshotUser.firstName + ' ' + snapshotUser.lastName;
						$scope.isLoggedIn = true;
						$scope.isNotLoggedIn = false;
						$scope.dataLoading = false;
					});
				}, function (errorObject) {
					$scope.$apply(function () {
						$scope.isLoggedIn = false;
						$scope.isNotLoggedIn = true;
						$scope.dataLoading = false;
					});
					console.log("The read failed: " + errorObject.code);
				});

			} else {
				$scope.isLoggedIn = false;
				$scope.isNotLoggedIn = true;
				$scope.dataLoading = false;
			}
		});

  });