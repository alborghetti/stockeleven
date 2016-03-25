'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:ListNasdaqCtrl
 * @description
 * # List Nasdaq stocks controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('ListNasdaqCtrl', function ($scope) {
   
   var ref = new Firebase("https://stockeleven.firebaseio.com/nasdaq");

  	ref.limitToLast(1).once("value", function(snapshot) {
  		//console.log(snapshot.val());
  		var lastList = snapshot.val();
  		for (var prop in lastList) {
  			//console.log("obj." + prop + " = " + lastList[prop]);
  			$scope.$apply(function() {
    			$scope.stocks = lastList[prop].stocks;
  				$scope.orderProp = 'rank';
  			});
		}
  		
  	}, function (errorObject) {
  		console.log("The read failed: " + errorObject.code);
  	});

  });