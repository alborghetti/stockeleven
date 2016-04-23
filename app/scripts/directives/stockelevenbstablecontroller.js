'use strict';

/**
 * @ngdoc directive
 * @name stockElevenApp.directive:stockelevenBsTableController
 * @description
 * # stockelevenBsTableController
 */
 angular.module('stockElevenApp')
 .directive('stockelevenBsTableController', function () {
 	return {
 		restrict: 'EA',
 		scope: {
 			options: '='
 		},
 		link: function (scope, element, attr) {
 			var tableCreated = false;
 			scope.$watch('options', function (newValue, oldValue) {
 				if (tableCreated && newValue === oldValue) return;
 				$(element).bootstrapTable('destroy');
 				if (newValue) {
 					$(element).bootstrapTable(scope.options);
 				}
 				tableCreated = typeof (newValue) !== 'undefined';
 			});
 			$(window).resize(function () {
 				if (tableCreated)
 					$(element).bootstrapTable('resetView');
 			})
 		}
 	};
 });
