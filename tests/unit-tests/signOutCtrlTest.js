describe('signOutCtrl', function() {
  var $controller;
  var $scope;
  var $state;
  var currentUserService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$state_, _$rootScope_, _currentUserService_) {
    $controller = _$controller_;
    $state = _$state_;
    $scope = _$rootScope_.$new();
    currentUserService = _currentUserService_;
  }));

  beforeEach(function() {
    var controller = $controller('signOutCtrl', {$scope: $scope});
  });

  it('Should sign out a user and redirect to signup page', function() {
    spyOn($state, 'go');
    $scope.signOut();
    expect(currentUserService.getUserData()).toBe(null);
    expect($state.go).toHaveBeenCalledWith('signin');
  });
});
