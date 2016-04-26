'use strict';

/**
 * @ngdoc directive
 * @name stockElevenApp.directive:stockElevenWindowScroll
 * @description
 * # stockElevenWindowScroll
 */
angular.module('stockElevenApp')
  .directive('stockelevenWindowScroll', function ($window) {
    return {
      restrict: 'AE',
      link: function (scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            $(".slideanim").each(function(){
    		var pos = $(this).offset().top;
		    var winTop = $(window).scrollTop();
		    if (pos < winTop + 600) {
		     	$(this).addClass("slide");
		    }
  			});
        });
      }
    };
  });
