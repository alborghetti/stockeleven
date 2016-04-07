   /**
 * @ngdoc function
 * @name stockElevenApp.controller:PasswordRecoveryCtrl
 * @description
 * # PasswordRecoveryCtrl
 * Controller of password recovery page
 */
 angular.module('stockElevenApp')
 .controller('PasswordRecoveryCtrl', function ($scope, $firebaseAuth) {

 	$scope.passwordRecovery = function () {
 		$scope.vm.dataLoading = true;
 		$scope.vm.error = false;
 		$scope.vm.success = false;

 		var ref = new Firebase("https://stockeleven.firebaseio.com/");

 		ref.resetPassword({
 			email : $scope.vm.email
 		}, function(error) {
 			if (error) {
 				$scope.$apply(function () {
 					$scope.vm.error = true;
 					$scope.vm.errorMessage = error.message;
 					$scope.vm.dataLoading = false;
 				});
 			} else {
 				$scope.$apply(function () {
 					$scope.vm.success = true;
 					$scope.vm.dataLoading = false;
            	});
 			}
 		});
 	}
 });