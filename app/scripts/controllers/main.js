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

		var that = this;
		 firebase.auth().onAuthStateChanged(function(user) {
		 	that.inOnAuth = true;
		 	var userOk = false;

		      if (user) {
		        userOk = user.emailVerified;
		      }
      		if (userOk) {
				firebase.database().ref('/users/'+ user.uid).once("value", function (snapshot) {
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