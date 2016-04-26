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
        var scrollTrigger = 100;
        angular.element($window).bind("scroll", function() {
          var winTop = $(window).scrollTop();
          
          $(".slideanim").each(function(){
            var pos = $(this).offset().top;
            if (pos < winTop + 600) {
            	$(this).addClass("slide");
            }
          });

          if (winTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }

        });
      }
    };
  });
