'use strict';

/**
 * @ngdoc directive
 * @name stockElevenApp.directive:stockelevenBack
 * @description
 * # stockelevenBack
 */
 angular.module('stockElevenApp')
 .directive('stockelevenBack', ['$window', function($window) {
 	return {
 		restrict: 'A',
 		link: function (scope, elem, attrs) {
 			elem.bind('click', function () {
 				$window.history.back();
 			});
 		}
 	};
 }]);
