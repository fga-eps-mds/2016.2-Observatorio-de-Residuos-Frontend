describe('signOutCtrl', function() {
  var $controller;
  var $scope;
  var $state;
  var $ionicHistory;
  var currentUserService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$state_, _$rootScope_,
   _currentUserService_, _$ionicHistory_) {
    $controller = _$controller_;
    $state = _$state_;
    $scope = _$rootScope_.$new();
    currentUserService = _currentUserService_;
    $ionicHistory = _$ionicHistory_;
  }));

  beforeEach(function() {
    var controller = $controller('signOutCtrl', {$scope: $scope});
  });

  it('should clear cache on sign out', function() {
    spyOn($ionicHistory, 'clearCache').and.callThrough();
    $scope.signOut();
    expect($ionicHistory.clearCache).toHaveBeenCalled();
  });

  it('Should sign out a user and redirect to signup page', function() {
    spyOn($ionicHistory, 'clearCache').and.callFake(function() {
      return {
        then: function(result){return result()}
      }
    });
    spyOn($ionicHistory, 'nextViewOptions');
    spyOn(currentUserService, 'setUserData');
    spyOn(currentUserService, 'setUserMarking');
    spyOn(currentUserService, 'setUserPevs');
    spyOn($state, 'go');
    $scope.signOut();
    expect($ionicHistory.nextViewOptions).toHaveBeenCalledWith({disableBack:true, 
                                                                historyRoot: true
                                                              });
    expect(currentUserService.setUserData).toHaveBeenCalledWith(null);
    expect(currentUserService.setUserMarking).toHaveBeenCalledWith([]);
    expect(currentUserService.setUserPevs).toHaveBeenCalledWith([]);
  });
});
