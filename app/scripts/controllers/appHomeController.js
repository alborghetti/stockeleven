'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:AppHomeCtrl
 * @description
 * # User area controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('AppHomeCtrl', function ($scope) {

    $scope.isLoggedIn = false;
    $scope.activeLists = [];
    $scope.inactiveLists = [];
    $scope.dataLoading = true;

    var ref = new Firebase("https://stockeleven.firebaseio.com/");
    ref.onAuth(function (authData) {
      if (authData) {
        $scope.isLoggedIn = true;
        //Get all defined lists
        ref.child('/lists').once("value", function (snapshot) {
          var lists = snapshot.val();

          //Get all user authorized lists
          ref.child('usersAuthorizations/' + authData.uid + '/lists').once("value", function (userSnapshot) {
            var userLists = userSnapshot.val();

            //Move lists to the scope
            var i = 0;
            for (var listId in lists) {
              if (i < 3) {
                i++;
              }
              var obj = {
                slide : 'slide-x-'+i,
                listId: listId,
                description: lists[listId].description
              };
              //Check if list require authorization or if it is free
              if (lists[listId].requireActivation) {
                if (userLists[listId]) {
                  $scope.$apply(function () {
                    $scope.activeLists.push(obj);
                    $scope.dataLoading = false;
                  });
                } else {
                  $scope.$apply(function () {
                    $scope.inactiveLists.push(obj);
                    $scope.dataLoading = false;
                  });
                }
              } else {
                $scope.$apply(function () {
                  $scope.activeLists.push(obj);
                  $scope.dataLoading = false;
                });
              }
            }
          }, function (errorObject) {
            //TODO error maintenance
            $scope.dataLoading = false;
            console.log("The read failed: " + errorObject.code);
          });

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