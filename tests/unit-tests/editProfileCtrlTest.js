describe('EditProfileCtrl', function(){
  var $controller;
  var $scope;
  var $ionicPopup;
  var $httpBackend;
  var $ionicLoading;
  var URL;
  
  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$ionicPopup_, 
                             _$httpBackend_, _$injector_, _$ionicLoading_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $ionicPopup = _$ionicPopup_;
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', /\.html$/).respond('');
      URL = _$injector_.get('URL');
  }));

  beforeEach(function() {
    var controller = $controller('editProfileCtrl', {$scope: $scope});
  });

  var user = "some user";

  it('should call a popup when requesting account deactivation', function() {
    spyOn($ionicPopup, 'show');
    $scope.deactivateAccount(user);
    expect($ionicPopup.show).toHaveBeenCalled();
  });

  it('should successfully deactiavte an account if provided password\
   is correct', function() {
    $scope.deactivateAccount(user);
    $scope.validateDeactivation();
    $httpBackend.expectGET(URL + '/profiles').respond(200);
    $httpBackend.expectPOST(URL + '/users/deactivate').respond(200);
    $httpBackend.flush();
  })
  
});
