   /**
 * @ngdoc function
 * @name stockElevenApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of registration page
 */
angular.module('stockElevenApp')
  .controller('RegisterCtrl', function ($scope) {

  	$scope.register = function() {
      alert('registering');
    };
   	
  });