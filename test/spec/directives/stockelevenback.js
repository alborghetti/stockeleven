'use strict';

describe('Directive: stockelevenBack', function () {

  // load the directive's module
  beforeEach(module('stockElevenApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stockeleven-back></stockeleven-back>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stockelevenBack directive');
  }));
});
