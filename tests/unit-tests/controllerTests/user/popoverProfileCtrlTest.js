describe('PopoverProfileCtrl', function() {
  var $controller;
  var $ionicPopover;
  var $scope = {};
  var currentUserService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$ionicPopover_, _currentUserService_) {
    $controller = _$controller_;
    $ionicPopover = _$ionicPopover_;
    currentUserService = _currentUserService_;
    })
  );
  it('should load the popover to the scope.', function(){
    spyOn($ionicPopover, 'fromTemplateUrl').and.callFake(function() {
      return {
        then: function(popover) {return popover({hide:function(){return 0;}});}
      };
    });
    var controller = $controller('popoverProfileCtrl', {$scope:$scope});
    spyOn($scope.popover,'hide');
    $scope.closePopover();
    expect($scope.popover.hide).toHaveBeenCalled();
    });
  });
