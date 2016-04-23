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

    var ref = new Firebase("https://stockeleven.firebaseio.com/demoLists/" + $routeParams.listId);

    $scope.listId = $routeParams.listId;
    $scope.dataLoading = true;
    ref.once("value", function (snapshot) {
      //console.log(snapshot.val());
      var List = snapshot.val();
      var date = new Date(List.timestamp);
      $scope.$apply(function () {
        $scope.stocks = List.stocks.slice(0, 30);
        $scope.listDate = date.toDateString();
        $scope.listText = List.description;
        $scope.dataLoading = false;
        $scope.tableOptions = {
            data:  $scope.stocks,
            rowStyle: function (row, index) {
                return { classes: 'none' };
            },
            cache: false,
            height: 600,
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
      console.log("The read failed: " + errorObject.code);
    });
  });