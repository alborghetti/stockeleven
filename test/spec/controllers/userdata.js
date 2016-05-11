'use strict';

describe('Controller: UserdataCtrl', function () {

  // load the controller's module
  beforeEach(module('stockElevenApp'));

  var UserdataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserdataCtrl = $controller('UserdataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserdataCtrl.awesomeThings.length).toBe(4);
  });
});
