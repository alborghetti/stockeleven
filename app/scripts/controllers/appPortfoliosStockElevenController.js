'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:AppPortfoliosStockElevenCtrl
 * @description
 * # Portfolios generated by Stock Eleven area controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('AppPortfoliosStockElevenCtrl', function ($scope, $rootScope) {

    $rootScope.$emit('viewLoaded', {});

    $scope.isLoggedIn = false;
    $scope.portfolios = [];
    $scope.inactivePortfolios = [];
    $scope.dataLoading = true;

    firebase.auth().onAuthStateChanged(function(user) {
      var userOk = false;

      if (user) {
        userOk = user.emailVerified;
      }

      if (userOk) {
        $scope.isLoggedIn = true;
        //Get all defined portfolios
        var ref = firebase.database().ref();
        ref.child('/stockElevenPortfolios').once("value", function (snapshot) {
          var portfolios = snapshot.val();

          //Get all user authorized portfolios
          ref.child('usersAuthorizations/' + user.uid + '/stockElevenPortfolios').once("value", function (userSnapshot) {
            var userPortfolios = userSnapshot.val();

            //Get all lists
            ref.child('lists/').once("value", function (listsSnapshot) {
              var lists = listsSnapshot.val();
              //Move lists to the scope
               var i = 0;
              for (var portfolioId in portfolios) {
                if (i < 3) {
                  i++;
                }
                var obj = {
                  slide : 'slide-x-'+i,
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
          $scope.dataLoading = false;
          $scope.isLoggedIn = false;
      }
    });

  });