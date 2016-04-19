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
      ref.onAuth(function(authData) {
        if (authData) {
          $scope.isLoggedIn = true;
          ref.child('users/'+authData.uid+'/lists').once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              ref.child(childSnapshot.key()+'/description').once("value", function(descSnapshot) {
                var obj = {
                    listId: childSnapshot.key(),
                    description: descSnapshot.val()
                  };
                if (childSnapshot.val() === true) {
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
              });
            });
          }, function (errorObject) {
            //TODO error maintenance
            console.log("The read failed: " + errorObject.code);
          });
        } else {
          $scope.isLoggedIn = false;
        }
      });

    });