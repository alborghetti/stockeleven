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

    var ref = new Firebase("https://stockeleven.firebaseio.com");

    $scope.listId = $routeParams.listId;

    ref.child('lists/' + $scope.listId + '/description').once("value", function (snapshot) {
      $scope.$apply(function () {
        $scope.listText = snapshot.val();
      });
    }, function (errorObject) {
      console.log("The read of list description failed: " + errorObject.code);
    });

    $scope.dataLoading = true;
    $scope.dataLoadingdd = true;

    if ($routeParams.date === "current") {
      ref.child($scope.listId + '/list').once("value", function (snapshot) {
        var date = new Date(snapshot.val().timestamp);
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.stocks = snapshot.val().stocks;
          $scope.orderProp = 'finalRank';
          $scope.listDate = date.toDateString();
        });
      }, function (errorObject) {
        $scope.$apply(function () {
          $scope.dataLoading = false;
        });
        console.log("The read of stocks list failed: " + errorObject.code);
      });
    } else {
      ref.child($scope.listId + '/previousLists/' + $routeParams.date).once("value", function (snapshot) {
        var date = new Date(snapshot.val().timestamp);
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.stocks = snapshot.val().stocks;
          $scope.orderProp = 'finalRank';
          $scope.listDate = date.toDateString();
        });
      }, function (errorObject) {
        $scope.$apply(function () {
          $scope.dataLoading = false;
        });
        console.log("The read of stocks list failed: " + errorObject.code);
      });
    }

    ref.child($scope.listId + '/previousLists/').limitToLast(15).once("value", function (snapshot) {
      var lists = [];
      var i = 0;
      var closeDataLoading = true;
      snapshot.forEach(function (childSnapshot) {
        closeDataLoading = false;
        i++;
        lists.push({
          pushId: childSnapshot.key(),
          timestamp: childSnapshot.child('timestamp').val(),
          date: new Date(childSnapshot.child('timestamp').val()).toDateString()
        });
        if (i === snapshot.numChildren()) {
          lists.sort(function (a, b) {
            return parseFloat(b.timestamp) - parseFloat(a.timestamp);
          });
          $scope.$apply(function () {
            $scope.dataLoadingdd = false;
            $scope.lists = lists;
          });
        }
      });
      if (closeDataLoading) {
        lists.push({
          pushId: 'current',
          date: 'No lists avaialable'
        });
        $scope.$apply(function () {
            $scope.dataLoadingdd = false;
            $scope.lists = lists;
          });
      }
    }, function (errorObject) {
      $scope.$apply(function () {
        $scope.dataLoadingdd = false;
      });
      console.log("The read of list of previous lists failed: " + errorObject.code);
    });
  });