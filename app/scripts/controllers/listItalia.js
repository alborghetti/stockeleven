  'use strict';

  /**
   * @ngdoc function
   * @name stockElevenApp.controller:ListItaliaCtrl
   * @description
   * # List Italia stocks controller
   * Controller of the stockElevenApp
   */
   angular.module('stockElevenApp')
   .controller('ListItaliaCtrl', function ($scope) {

   	var ref = new Firebase("https://stockeleven.firebaseio.com/milano");

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

    ref.once("value", function(snapshot) {
        var snapshotLists = snapshot.val();
        var lists = [];
        for (var prop in snapshotLists) {
          lists.push({
            id: prop,
            timestamp : snapshotLists[prop].timestamp
          });
        }
        $scope.$apply(function() {
            $scope.lists = lists;
          });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });



    	
    });