'use strict';

describe('Directive: stockelevenBsTableController', function () {

  // load the directive's module
  beforeEach(module('stockElevenApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stockeleven-bs-table-controller></stockeleven-bs-table-controller>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stockelevenBsTableController directive');
  }));
});
