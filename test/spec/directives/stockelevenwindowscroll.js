'use strict';

describe('Directive: stockElevenWindowScroll', function () {

  // load the directive's module
  beforeEach(module('stockElevenApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stock-eleven-window-scroll></stock-eleven-window-scroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stockElevenWindowScroll directive');
  }));
});
