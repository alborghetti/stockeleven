  'use strict';

  /**
   * @ngdoc function
   * @name stockElevenApp.controller:ListCtrl
   * @description
   * # List controller
   * Controller of the stockElevenApp
   */
   angular.module('stockElevenApp')
   .controller('ListCtrl', function ($scope, $routeParams) {

    var refDescription = new Firebase("https://stockeleven.firebaseio.com/"+$routeParams.listId+"/description");
    var refLists = new Firebase("https://stockeleven.firebaseio.com/"+$routeParams.listId+"/lists");
    var refSelectedList = new Firebase("https://stockeleven.firebaseio.com/"+$routeParams.listId+"/lists/"+$routeParams.date);

    $scope.listId = $routeParams.listId;

    refDescription.once("value", function(snapshot) {
      $scope.$apply(function() {
          $scope.listText =  snapshot.val();
        });
      }, function (errorObject) {
        console.log("The read of list description failed: " + errorObject.code);
      });



    if ($routeParams.date === "current") {
      refLists.limitToLast(1).once("value", function(snapshot) {
        var lastList = snapshot.val();
        for (var prop in lastList) {
          var date = new Date(lastList[prop].timestamp);
          $scope.$apply(function() {
            $scope.stocks = lastList[prop].stocks.slice(0,29);
            $scope.orderProp = 'finalRank';
            $scope.listDate = date.toDateString();
          });
        }
      }, function (errorObject) {
        console.log("The read of stocks list failed: " + errorObject.code);
      });
    } else {
      refSelectedList.once("value", function(snapshot) {
        var list = snapshot.val();
        var date = new Date(list.timestamp);
        $scope.$apply(function() {
          $scope.stocks = list.stocks.slice(0,29);
          $scope.orderProp = 'finalRank';
          $scope.listDate = date.toDateString();
        });
      }, function (errorObject) {
        console.log("The read of stocks list failed: " + errorObject.code);
      });
    }

    refLists.limitToLast(15).once("value", function(snapshot) {
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
      lists.sort(function(a, b) {
        return parseFloat(b.timestamp) - parseFloat(a.timestamp);
      });
      $scope.$apply(function() {
        $scope.lists = lists;
      });
    }, function (errorObject) {
      console.log("The read of list of lists failed: " + errorObject.code);
    });
  });