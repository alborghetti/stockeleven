'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller: portfolioStockElevenCtrl
 * @description
 * # Portfolio controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('portfolioStockElevenCtrl', function ($scope, $routeParams) {

    var ref = new Firebase("https://stockeleven.firebaseio.com/");

    $scope.portfolioId = $routeParams.portfolioId;
    $scope.dataLoading = true;


    ref.child($scope.portfolioId).once("value", function (snapshot) {
      var portfolio = snapshot.val();
      var date = new Date(portfolio.timestamo);
      for (var prop in portfolio) {
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.stocks = portfolio.stocks;
          $scope.orderProp = 'stock';
          $scope.date = date.toDateString();
          $scope.marketValue = portfolio.marketValue.currentValue;
          $scope.portfolioValue = portfolio.value.currentValue;
          $scope.difference = portfolio.difference;
        });
      }

      //Get portfolio description
      ref.child('stockElevenPortfolios/'+$scope.portfolioId).once("value", function (snapshot) {
        var portfolioDescription = snapshot.val().description;
        var baseList = snapshot.val().baseList;
        //Get list description
        ref.child('lists/'+baseList).once("value", function (snapshot) {
          var listDescription = snapshot.val().description;
          $scope.$apply(function () {
            $scope.portfolioDescription = portfolioDescription;
            $scope.listDescription = listDescription;
          });
        }, function (errorObject) {
          $scope.$apply(function () {
            $scope.dataLoading = false;
          });
          console.log("The read of stocks portfolio failed: " + errorObject.code);
        });
      }, function (errorObject) {
        $scope.$apply(function () {
          $scope.dataLoading = false;
        });
        console.log("The read of stocks portfolio failed: " + errorObject.code);
      });




    }, function (errorObject) {
      $scope.$apply(function () {
        $scope.dataLoading = false;
      });
      console.log("The read of stocks portfolio failed: " + errorObject.code);
    });


  });