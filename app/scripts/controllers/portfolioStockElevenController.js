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
      var date = new Date(portfolio.timestamp);
      for (var prop in portfolio) {
        $scope.$apply(function () {
          $scope.dataLoading = false;
          $scope.stocks = portfolio.stocks;
          $scope.orderProp = 'stock';
          $scope.date = date.toDateString();
          $scope.marketValue = portfolio.marketValue.currentValue;
          $scope.portfolioValue = portfolio.value.currentValue;
          $scope.difference = portfolio.difference;
          if ($scope.difference.substr(0,1) === '-') {
            $scope.differenceArrow = 'glyphicon-chevron-down';
            $scope.differenceLabel = 'label-danger';
          } else {
            $scope.differenceArrow = 'glyphicon-chevron-up';
            $scope.differenceLabel = 'label-success';
          }
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
            sortName: 'purchaseValue',
            sortOrder: 'desc',
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
                field: 'company',
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
                field: 'purchasePrice',
                title: 'Purchase price',
                align: 'right',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'deltaP',
                title: 'Delta price',
                align: 'right',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'purchaseValue',
                title: 'Purchase value',
                align: 'right',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'currentValue',
                title: 'Current value',
                align: 'right',
                valign: 'bottom',
                sortable: true
            }]
        };
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