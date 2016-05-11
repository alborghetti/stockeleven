'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('stockElevenApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach the OnAuth Callback', function () {
    expect(MainCtrl.inOnAuth).toBe(true);
  });
});
