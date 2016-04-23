'use strict';

describe('Directive: stockelevenTableScroll', function () {

  // load the directive's module
  beforeEach(module('stockElevenApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stockeleven-table-scroll></stockeleven-table-scroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stockelevenTableScroll directive');
  }));
});
