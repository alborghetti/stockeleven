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

     	var ref = new Firebase("https://stockeleven.firebaseio.com/demoLists/"+$routeParams.listId);

      $scope.listId = $routeParams.listId;
      $scope.dataLoading = true;
      ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
        var List = snapshot.val();
        var date = new Date(List.timestamp);
        $scope.$apply(function() {
          $scope.stocks = List.stocks.slice(0,30);
          $scope.listText = List.description;
          $scope.orderProp = 'finalRank';
          $scope.listDate = date.toDateString();
          $scope.dataLoading = false;
        });
      }, function (errorObject) {
        $scope.$apply(function() {
          $scope.dataLoading = false;
        });
        console.log("The read failed: " + errorObject.code);
      });

    });