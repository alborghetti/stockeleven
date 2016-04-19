    'use strict';

    /**
     * @ngdoc function
     * @name stockElevenApp.controller:AppMyPortfoliosCtrl
     * @description
     * # User Portfolios area controller
     * Controller of the stockElevenApp
     */
     angular.module('stockElevenApp')
     .controller('AppMyPortfoliosCtrl', function ($scope) {

      $scope.isLoggedIn = false;
      $scope.portfolios = [];
      $scope.dataLoading = true;

      var ref = new Firebase("https://stockeleven.firebaseio.com/");
      ref.onAuth(function(authData) {
        if (authData) {
          $scope.isLoggedIn = true;
          ref.child('users/'+authData.uid+'/userPortfolios/active').once("value", function(snapshot) {
            if (snapshot.val() === true) {
              //TODO portfolios read
              var obj = {
                portfolioId: "P01",
                description: "Test portfolio",
                market: "Nasdaq"
              };
              $scope.$apply(function () {
                  $scope.portfolios.push(obj);
                  $scope.dataLoading = false;
              });
            }
          }, function (errorObject) {
            //TODO error maintenance
            $scope.dataLoading = false;
            console.log("The read failed: " + errorObject.code);
          });
        } else {
          $scope.dataLoading = false;
          $scope.isLoggedIn = false;
        }
      });

    });