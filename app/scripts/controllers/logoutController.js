  /**
 * @ngdoc function
 * @name stockElevenApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of login page
 */
angular.module('stockElevenApp')
  .controller('LogoutCtrl', function ($scope, $firebaseAuth) {
  	
  	var ref = new Firebase("https://stockeleven.firebaseio.com/");
	ref.unauth();
   
  });