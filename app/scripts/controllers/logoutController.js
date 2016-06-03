'use strict';
  /**
 * @ngdoc function
 * @name stockElevenApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of login page
 */
angular.module('stockElevenApp')
  .controller('LogoutCtrl', function ($scope, $firebaseAuth, $location) {

	firebase.auth().signOut().then(function() {
  		$location.path('/');
	}, function(error) {
	  // todo
	});

  });