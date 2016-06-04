'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:AppHomeCtrl
 * @description
 * # User area controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('AppHomeCtrl', function ($scope, $rootScope) {

    $rootScope.$emit('viewLoaded', {});

    $scope.isLoggedIn = false;
    $scope.dataLoading = true;

    firebase.auth().onAuthStateChanged(function(user) {
      var userOk = false;

      if (user) {
        userOk = user.emailVerified;
      }

      if (userOk) {
        $scope.activeLists = [];
        $scope.inactiveLists = [];
        $scope.isLoggedIn = true;
        //Get all defined lists
        firebase.database().ref('/lists').once("value", function (snapshot) {
          var lists = snapshot.val();

          //Get all user authorized lists
          firebase.database().ref('usersAuthorizations/' + user.uid + '/lists').once("value", function (userSnapshot) {
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