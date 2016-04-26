'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('MainCtrl', function ($scope, $window, $firebaseAuth, $location, $anchorScroll, $document) {

  	$scope.slide = function (dir) {
    	$('#myCarousel').carousel(dir);
	};

  	$scope.isActive = function(route) {
        return route === $location.path();
      }

	var ref = new Firebase("https://stockeleven.firebaseio.com/");
	ref.onAuth(function(authData) {
		if (authData) {
			$scope.isLoggedIn = true;
			ref = new Firebase("https://stockeleven.firebaseio.com/users/"+authData.uid);
			ref.once("value", function(snapshot) {
      			var snapshotUser = snapshot.val();
				
				$scope.$apply(function() {
					$scope.userName = snapshotUser.firstName + ' ' + snapshotUser.lastName;
				});
				}, function (errorObject) {
					console.log("The read failed: " + errorObject.code);
			});

		} else {
			$scope.isLoggedIn = false;
		}
	});

  });