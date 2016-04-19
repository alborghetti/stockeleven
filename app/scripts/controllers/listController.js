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

    $scope.dataLoading = true;
    $scope.dataLoadingdd = true;

    if ($routeParams.date === "current") {
      refLists.limitToLast(1).once("value", function(snapshot) {
        var lastList = snapshot.val();
        for (var prop in lastList) {
          var date = new Date(lastList[prop].timestamp);
          $scope.$apply(function() {
            $scope.dataLoading = false;
            $scope.stocks = lastList[prop].stocks.slice(0,30);
            $scope.orderProp = 'finalRank';
            $scope.listDate = date.toDateString();
          });
        }
      }, function (errorObject) {
        $scope.$apply(function() {
          $scope.dataLoading = false;
        });
        console.log("The read of stocks list failed: " + errorObject.code);
      });
    } else {
      refSelectedList.once("value", function(snapshot) {
        var list = snapshot.val();
        var date = new Date(list.timestamp);
        $scope.$apply(function() {
          $scope.dataLoading = false;
          $scope.stocks = list.stocks.slice(0,30);
          $scope.orderProp = 'finalRank';
          $scope.listDate = date.toDateString();
        });
      }, function (errorObject) {
        $scope.$apply(function() {
          $scope.dataLoading = false;
        });
        console.log("The read of stocks list failed: " + errorObject.code);
      });
    }

    refLists.limitToLast(15).once("value", function(snapshot) {
      var lists = [];
      var i = 0;
      snapshot.forEach(function(childSnapshot) {
        i++;
        lists.push({
          pushId: childSnapshot.key(),
          timestamp : childSnapshot.child('timestamp').val(),
          date: new Date(childSnapshot.child('timestamp').val()).toDateString()
        });
        if (i ===  snapshot.numChildren()) {
          lists.sort(function(a, b) {
            return parseFloat(b.timestamp) - parseFloat(a.timestamp);
          });
          $scope.$apply(function() {
            $scope.dataLoadingdd = false;
            $scope.lists = lists;
          });
        }
      });
    }, function (errorObject) {
      $scope.$apply(function() {
          $scope.dataLoadingdd = false;
        });
      console.log("The read of list of lists failed: " + errorObject.code);
    });
  });