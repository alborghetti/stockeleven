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

      ref.once("value", function(snapshot) {
        //console.log(snapshot.val());
        var List = snapshot.val();
        var date = new Date(List.timestamp);
        $scope.$apply(function() {
          $scope.stocks = List.stocks.slice(0,29);
          $scope.listText = List.description;
          $scope.orderProp = 'finalRank';
          $scope.listDate = date.toDateString();
        });
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    });