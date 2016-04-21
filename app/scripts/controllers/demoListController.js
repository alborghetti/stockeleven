'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:DemoListCtrl
 * @description
 * # Demo List controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('DemoListCtrl', function ($scope, $routeParams) {

    var ref = new Firebase("https://stockeleven.firebaseio.com/demoLists/" + $routeParams.listId);
    var refDescription = new Firebase("https://stockeleven.firebaseio.com/lists/" + $routeParams.listId + "/description");
    refDescription.once("value", function(snapshot) {
      $scope.$apply(function() {
          $scope.listText =  snapshot.val();
        });
      }, function (errorObject) {
        console.log("The read of list description failed: " + errorObject.code);
      });

    $scope.listId = $routeParams.listId;
    $scope.dataLoading = true;
    ref.once("value", function (snapshot) {
      //console.log(snapshot.val());
      var List = snapshot.val();
      var date = new Date(List.timestamp);
      $scope.$apply(function () {
        $scope.stocks = List.stocks.slice(0, 30);
        $scope.orderProp = 'finalRank';
        $scope.listDate = date.toDateString();
        $scope.dataLoading = false;
      });
    }, function (errorObject) {
      $scope.$apply(function () {
        $scope.dataLoading = false;
      });
      console.log("The read failed: " + errorObject.code);
    });

  });