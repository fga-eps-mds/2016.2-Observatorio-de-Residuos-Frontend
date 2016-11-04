describe('tutorialCtrl', function() {
  var $controller;
  var $scope = {};
  var $state;
  var $ionicSlideBoxDelegate;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$state_, _$ionicSlideBoxDelegate_){
    $controller = _$controller_;
    $state = _$state_;
    $ionicSlideBoxDelegate = _$ionicSlideBoxDelegate_;
  }));

  beforeEach(function() {
    var controller = $controller('tutorialCtrl', {$scope: $scope});
  });

  describe('startApp',function() {
    
    it('Go to initial screen', function() {
      spyOn($state, 'go');
      $scope.startApp();
      expect($state.go).toHaveBeenCalledWith("tabs.map");
    });
  });

  describe('next',function() {
    it('Call next slide', function() {
      spyOn($ionicSlideBoxDelegate, 'next');
      $scope.next();
      expect($ionicSlideBoxDelegate.next).toHaveBeenCalled();
    });
  });

  describe('previous',function() {
    it('Call previous slide', function() {
      spyOn($ionicSlideBoxDelegate, 'previous');
      $scope.previous();
      expect($ionicSlideBoxDelegate.previous).toHaveBeenCalled();
    });
  });

});