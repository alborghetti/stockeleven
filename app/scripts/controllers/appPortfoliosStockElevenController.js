'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:AppPortfoliosStockElevenCtrl
 * @description
 * # Portfolios generated by Stock Eleven area controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('AppPortfoliosStockElevenCtrl', function ($scope) {

    $scope.isLoggedIn = false;
    $scope.portfolios = [];
    $scope.dataLoading = true;

    var ref = new Firebase("https://stockeleven.firebaseio.com/");
    ref.onAuth(function (authData) {
      if (authData) {
        $scope.isLoggedIn = true;
        //Get all defined portfolios
        ref.child('/stockElevenPortfolios').once("value", function (snapshot) {
          var portfolios = snapshot.val();

          //Get all user authorized portfolios
          ref.child('usersAuthorizations/' + authData.uid + '/stockElevenPortfolios').once("value", function (userSnapshot) {
            var userPortfolios = userSnapshot.val();

            //Get all lists
            ref.child('lists/').once("value", function (listsSnapshot) {
              var lists = listsSnapshot.val();
              //Move lists to the scope
              for (var portfolioId in portfolios) {
                var obj = {
                  portfolioId: portfolioId,
                  description: portfolios[portfolioId].description,
                  baseList: lists[portfolios[portfolioId].baseList].description
                };
                //Check if portfolio require authorization or if it is free
                if (portfolios[portfolioId].requireActivation) {
                  if (userPortfolios[portfolioId]) {
                    $scope.$apply(function () {
                      $scope.portfolios.push(obj);
                      $scope.dataLoading = false;
                    });
                  } else {
                    $scope.$apply(function () {
                      $scope.inactivePortfolios.push(obj);
                      $scope.dataLoading = false;
                    });
                  }
                } else {
                  $scope.$apply(function () {
                    $scope.portfolios.push(obj);
                    $scope.dataLoading = false;
                  });
                }
              }
            }, function (errorObject) {
              //TODO error maintenance
              $scope.$apply(function () { $scope.dataLoading = false; });
              console.log("The read failed: " + errorObject.code);
            });

          }, function (errorObject) {
            //TODO error maintenance
            $scope.$apply(function () { $scope.dataLoading = false; });
            console.log("The read failed: " + errorObject.code);
          });
        }, function (errorObject) {
          //TODO error maintenance
          $scope.$apply(function () { $scope.dataLoading = false; });
          console.log("The read failed: " + errorObject.code);
        });
      } else {
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.isLoggedIn = false;
        });
      }
    });

  });