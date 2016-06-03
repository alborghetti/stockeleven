    'use strict';

    /**
     * @ngdoc function
     * @name stockElevenApp.controller:ListCtrl
     * @description
     * # List controller
     * Controller of the stockElevenApp
     */
     angular.module('stockElevenApp')
     .controller('ListCtrl', function ($scope, $rootScope, $routeParams) {

      $rootScope.$emit('viewLoaded', {});
      $scope.dataLoading = true;
      $scope.dataLoadingdd = true;

      var rowStyle = function(row, index) {
        if (row.dailyVariationP.substr(0,1) === '-') {
          return {
            classes: 'danger'
          };
        }
        return {
          classes: 'success'
        };
      }

      $scope.listId = $routeParams.listId;

      var ref = firebase.database().ref();

      firebase.auth().onAuthStateChanged(function(user) {
        var userOk = false;
        if (user) {
          userOk = user.emailVerified;
        }

        if (userOk) {
          $scope.isLoggedIn = true;
          ref.child('lists/' + $scope.listId).once("value", function (snapshot) {
            var timezone = snapshot.val().timezone;
          //Set description
          $scope.$apply(function () {
            $scope.listText = snapshot.val().description;
          });
          //Get list
          if ($routeParams.date === "current") {
            ref.child($scope.listId + '/list').once("value", function (snapshot) {
              $scope.$apply(function () {
                $scope.dataLoading = false;
                $scope.stocks = snapshot.val().stocks;
                $scope.listDate = moment.tz(snapshot.val().timestamp, timezone).format('dddd, MMMM Do YYYY');
                $scope.tableOptions = {
                  data:  $scope.stocks,
                  cache: false,
                  striped: true,
                  pagination: true,
                  pageSize: 10,
                  pageList: [10, 20, 30],
                  search: true,
                  showColumns: true,
                  showRefresh: false,
                  minimumCountColumns: 2,
                  clickToSelect: true,
                  showToggle: true,
                  maintainSelected: true,
                  rowStyle: rowStyle,
                  columns: [{
                    field: 'titoloTicker',
                    align: 'left',
                    title: 'Stock',
                    sortable: true,
                    valign: 'bottom'
                  }, {
                    field: 'lastPrice',
                    title: 'Last Price',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'dailyVariationP',
                    title: 'Daily variation %',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'pe',
                    title: 'PE',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'eps',
                    title: 'EPS',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'high52',
                    title: 'High 52',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }]
                };
              });
            }, function (errorObject) {
              $scope.$apply(function () {
                $scope.dataLoading = false;
              });
              console.log("The read of stocks list failed: " + errorObject.code);
            });
          } else {
            ref.child($scope.listId + '/previousLists/' + $routeParams.date).once("value", function (snapshot) {
              $scope.$apply(function () {
                $scope.dataLoading = false;
                $scope.stocks = snapshot.val().stocks;
                $scope.listDate = moment.tz(snapshot.val().timestamp, timezone).format('dddd, MMMM Do YYYY');
                $scope.tableOptions = {
                  data:  $scope.stocks,
                  cache: false,
                  striped: true,
                  pagination: true,
                  pageSize: 10,
                  pageList: [10, 20, 30],
                  search: true,
                  showColumns: true,
                  showRefresh: false,
                  minimumCountColumns: 2,
                  clickToSelect: true,
                  showToggle: true,
                  showExport: true,
                  maintainSelected: true,
                  rowStyle: rowStyle,
                  columns: [{
                    field: 'titoloTicker',
                    align: 'left',
                    title: 'Stock',
                    sortable: true,
                    valign: 'bottom'
                  }, {
                    field: 'lastPrice',
                    title: 'Last Price',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'dailyVariationP',
                    title: 'Daily variation %',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'pe',
                    title: 'PE',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'eps',
                    title: 'EPS',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }, {
                    field: 'high52',
                    title: 'High 52',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                  }]
                };
              });
            }, function (errorObject) {
              $scope.$apply(function () {
                $scope.dataLoading = false;
              });
              console.log("The read of stocks list failed: " + errorObject.code);
            });
          }

           //Get previous lists fro dropdown
           ref.child($scope.listId + '/previousLists/').limitToLast(15).once("value", function (snapshot) {
            var lists = [];
            var i = 0;
            var closeDataLoading = true;
            lists.push({
              pushId: 'current',
              date: 'Current list'
            });
            snapshot.forEach(function (childSnapshot) {
              closeDataLoading = false;
              i++;
              lists.push({
                pushId: childSnapshot.key,
                timestamp: childSnapshot.child('timestamp').val(),
                date: moment.tz(childSnapshot.child('timestamp').val(), timezone).format('dddd, MMMM Do YYYY')
              });
              if (i === snapshot.numChildren()) {
                lists.sort(function (a, b) {
                  return parseFloat(b.timestamp) - parseFloat(a.timestamp);
                });
                $scope.$apply(function () {
                  $scope.dataLoadingdd = false;
                  $scope.lists = lists;
                });
              }
            });
            if (closeDataLoading) {
              $scope.$apply(function () {
                $scope.dataLoadingdd = false;
                $scope.lists = lists;
              });
            }
          }, function (errorObject) {
            $scope.$apply(function () {
              $scope.dataLoadingdd = false;
            });
            console.log("The read of list of previous lists failed: " + errorObject.code);
          });
         }, function (errorObject) {
          console.log("The read of list description failed: " + errorObject.code);
        });
    } else {
      $scope.dataLoading = false;
      $scope.isLoggedIn = false;
    }
  });
});