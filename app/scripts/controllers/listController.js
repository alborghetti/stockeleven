  'use strict';

  /**
   * @ngdoc function
   * @name stockElevenApp.controller:ListItaliaCtrl
   * @description
   * # List Italia stocks controller
   * Controller of the stockElevenApp
   */
   angular.module('stockElevenApp')
   .controller('ListCtrl', function ($scope, $routeParams) {

   	var ref = new Firebase("https://stockeleven.firebaseio.com/"+$routeParams.listId);

    $scope.listId = $routeParams.listId;

    switch ($routeParams.listId) {
      case 'milano':
      $scope.listText = 'Ftse Italia all-share Ranking';
      break;
      case 'nasdaq':
      $scope.listText = 'Nasdaq Ranking';
      break;
      default:
      $scope.listText = 'List not found';
    }

    if ($routeParams.date === "current") {
      ref.limitToLast(1).once("value", function(snapshot) {
      //console.log(snapshot.val());
      var lastList = snapshot.val();
      for (var prop in lastList) {
        //console.log("obj." + prop + " = " + lastList[prop]);
        var date = new Date(lastList[prop].timestamp);
        $scope.$apply(function() {
          $scope.stocks = lastList[prop].stocks;
          $scope.orderProp = 'rank';
          $scope.listDate = date.toDateString();
        });
      }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    } else {
      var selectedListref = new Firebase("https://stockeleven.firebaseio.com/"+$routeParams.listId+"/"+$routeParams.date);
      selectedListref.once("value", function(snapshot) {
        var list = snapshot.val();
        var date = new Date(list.timestamp);
        $scope.$apply(function() {
          $scope.stocks = list.stocks;
          $scope.orderProp = 'rank';
          $scope.listDate = date.toDateString();
        });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }


    ref.once("value", function(snapshot) {
      var snapshotLists = snapshot.val();
      var lists = [];
      for (var prop in snapshotLists) {
        var date = new Date(snapshotLists[prop].timestamp);
        lists.push({
          pushId: prop,
          timestamp : snapshotLists[prop].timestamp,
          date: date.toDateString()
        });
      }
      $scope.$apply(function() {
        $scope.lists = lists;
      });
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });




  });