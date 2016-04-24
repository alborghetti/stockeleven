'use strict';

/**
 * @ngdoc function
 * @name stockElevenApp.controller:ListCtrl
 * @description
 * # List controller
 * Controller of the stockElevenApp
 */
angular.module('stockElevenApp')
  .controller('ListCtrl', function ($scope, $routeParams) {

    var ref = new Firebase("https://stockeleven.firebaseio.com");

    $scope.listId = $routeParams.listId;

    ref.child('lists/' + $scope.listId + '/description').once("value", function (snapshot) {
      $scope.$apply(function () {
        $scope.listText = snapshot.val();
      });
    }, function (errorObject) {
      console.log("The read of list description failed: " + errorObject.code);
    });

    $scope.dataLoading = true;
    $scope.dataLoadingdd = true;

    if ($routeParams.date === "current") {
      ref.child($scope.listId + '/list').once("value", function (snapshot) {
        var date = new Date(snapshot.val().timestamp);
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.stocks = snapshot.val().stocks;
          $scope.listDate = date.toDateString();
          $scope.tableOptions = {
            data:  $scope.stocks,
            rowStyle: function (row, index) {
                return { classes: 'none' };
            },
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
            rowStyle: function(row, index) {
                        if (row.dailyVariationP.substr(0,1) === '-') {
                          return {
                            classes: 'danger'
                            };
                        }
                        return {
                          classes: 'success'
                        };
                      },
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
        var date = new Date(snapshot.val().timestamp);
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.stocks = snapshot.val().stocks;
          $scope.listDate = date.toDateString();
          $scope.tableOptions = {
            data:  $scope.stocks,
            rowStyle: function (row, index) {
                return { classes: 'none' };
            },
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
            rowStyle: function(row, index) {
                        if (row.dailyVariationP.substr(0,1) === '-') {
                          return {
                            classes: 'danger'
                            };
                        }
                        return {
                          classes: 'success'
                        };
                      },
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

    ref.child($scope.listId + '/previousLists/').limitToLast(15).once("value", function (snapshot) {
      var lists = [];
      var i = 0;
      var closeDataLoading = true;
      snapshot.forEach(function (childSnapshot) {
        closeDataLoading = false;
        i++;
        lists.push({
          pushId: childSnapshot.key(),
          timestamp: childSnapshot.child('timestamp').val(),
          date: new Date(childSnapshot.child('timestamp').val()).toDateString()
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
        lists.push({
          pushId: 'current',
          date: 'No lists avaialable'
        });
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
  });