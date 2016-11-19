fdescribe('EditProfileCtrl', function(){
  var $controller;
  var $scope;
  var $ionicPopup;
  var $httpBackend;
  var $ionicLoading;
  var $timeout;
  var $state;
  var currentUserService;
  var URL;
  
  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$rootScope_, _$ionicPopup_, 
                             _$httpBackend_, _$injector_, _$ionicLoading_,
                             _$timeout_, _$state_, _currentUserService_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $ionicPopup = _$ionicPopup_;
      $httpBackend = _$httpBackend_;
      $ionicLoading = _$ionicLoading_;
      $timeout = _$timeout_;
      $state = _$state_;
      currentUserService = _currentUserService_;
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

  describe('in successfull account deactivation', function() {

    beforeEach(function(){
      $scope.deactivateAccount(user);
      $scope.validateDeactivation();
      $httpBackend.expectGET(URL + '/profiles').respond(200);
      $httpBackend.expectPOST(URL + '/users/deactivate').respond(200);
    })

    it('should show a loading message confirming successfull deactivation of\
     account', function() {
      spyOn($ionicLoading, 'show');
      $httpBackend.flush();
      expect($ionicLoading.show).toHaveBeenCalled();
    });

    it('should hide the loading message, logoff te user, and redirect to\
     signing page', function() {
      spyOn($ionicLoading, 'hide');
      spyOn($state, 'go');
      spyOn(currentUserService, 'setUserData');
      $httpBackend.flush();
      $timeout.flush();
      expect($ionicLoading.hide).toHaveBeenCalled();
      expect(currentUserService.setUserData).toHaveBeenCalledWith(null);
      expect($state.go).toHaveBeenCalledWith('signin');
    });

  });

  describe('in failed account deactivation', function() {

    beforeEach(function() {
      $httpBackend.expectGET(URL + '/profiles').respond(200);
      $scope.deactivateAccount(user);
      $scope.validateDeactivation();
      spyOn($ionicPopup, 'alert');
    });

    it('should show a popup alert containing the error code', function() {
      $httpBackend.expectPOST(URL + '/users/deactivate').respond(400);
      $httpBackend.flush();
      expect($ionicPopup.alert).toHaveBeenCalledWith({
        title: 'Erro', template: 'Código do erro: 400.'
      });
    });

    it('should show a popup alert contaning wrong password message  if password\
     was wrong', function() {
      $httpBackend.expectPOST(URL + '/users/deactivate').respond(401);
      $httpBackend.flush();
      expect($ionicPopup.alert).toHaveBeenCalledWith({
        title: 'Erro', template: 'Senha incorreta.'
      });
    });
  });

});
