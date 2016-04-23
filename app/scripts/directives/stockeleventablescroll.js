'use strict';

/**
 * @ngdoc directive
 * @name stockElevenApp.directive:stockelevenTableScroll
 * @description
 * # stockelevenTableScroll
 */
 angular.module('stockElevenApp')
 .directive('stockelevenTableScroll', function () {
 	return {
 		restrict: 'A',
 		link: function (scope, element, attrs) {

 			$(element).addClass( "binded_scroll" );

 			$(element).scroll(function(){
 				$( '.binded_scroll' ).scrollLeft($(this).scrollLeft());
 			});
 		}
 	};
 });
