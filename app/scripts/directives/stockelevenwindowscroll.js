'use strict';

/**
 * @ngdoc directive
 * @name stockElevenApp.directive:stockElevenWindowScroll
 * @description
 * # stockElevenWindowScroll
 */
 angular.module('stockElevenApp')
 .directive('stockelevenWindowScroll', function ($window, $document) {
  return {
    restrict: 'AE',
    link: function (scope, element, attrs) {
      var scrollTrigger = 200;
      angular.element($window).bind("scroll", function() {
        var winTop = $(window).scrollTop();

        $(".slideanim").each(function(){
          var pos = $(this).offset().top;
          if (pos < winTop + 600) {
           $(this).addClass("slide");
         }
       });

        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
          $('#back-to-top').removeClass("slide-down");
          $('#back-to-top').addClass("slide");
          $('#back-to-top').css({ bottom: '150px'});
        } else {
          $('#back-to-top').removeClass("slide");
          $('#back-to-top').addClass("slide-down");
          $('#back-to-top').css({ bottom: '0px'});
        }

        if (winTop > scrollTrigger) {
          $('#back-to-top').addClass('show');
        } else {
          $('#back-to-top').removeClass('show');
        }


      });
    }
  };
});
