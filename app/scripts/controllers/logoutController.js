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
  	
  	var ref = new Firebase("https://stockeleven.firebaseio.com/");
	ref.unauth();
	$location.path('/');
   
  });