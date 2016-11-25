describe('signinCtrl',function(){

  var $controller;
  var $httpBackend;
  var $state;
  var $scope = {};
  var URL;
  var $ionicLoading;
  var $timeout;
  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _$httpBackend_, _$state_, $injector, _$ionicLoading_, _$timeout_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    $state = _$state_;
    $timeout = _$timeout_;
    $ionicLoading = _$ionicLoading_;
    URL = $injector.get('URL');
  }));

  beforeEach(function() {
    var controller = $controller('signinCtrl', {$scope: $scope, $ionicLoading:$ionicLoading, $timeout:$timeout});
    spyOn($state, 'go');
  });

  describe('loginAttempt',function() {
    var user = {name:'Amoedo', email:'amoedo@gmail.com'};

    it('login a valid user succesfully', function() {
      var result = {id_usuario: 1, nome_completo: "Lucas Amoẽdo", usuario: "amoedo"}
      $httpBackend.expectPOST(URL + '/sessions/login', user).respond(201, result);
      $httpBackend.expectGET(URL + '/user/' + result.id_usuario + '/markings').respond(200);
      $httpBackend.expectGET(URL + '/user/' + result.id_usuario + '/pevs').respond(200);
      $scope.loginAttempt(user);
      $httpBackend.flush();
      expect($state.go).toHaveBeenCalledWith("tabs.home");
      expect($scope.loginError).toBeFalsy();
    });

    it('does not login an invalid user', function() {
      $httpBackend.expectPOST(URL + '/sessions/login', user).respond(401);
      $scope.loginAttempt(user);
      $httpBackend.flush();
      expect($state.go).not.toHaveBeenCalled();
      expect($scope.loginError).toBeTruthy();
    });
    it('does not login an deactivated user', function() {
      var error = {status:403};
      $httpBackend.expectPOST(URL + '/sessions/login', user).respond(403,error);
      $scope.loginAttempt(user);
      $httpBackend.flush();
      expect($state.go).not.toHaveBeenCalled();
      expect($scope.loginError).toBeTruthy();
    });
    it('does not login an user if cannot load its pevs', function() {
          var result = {id_usuario: 1, nome_completo: "Lucas Amoẽdo", usuario: "amoedo"}
          $httpBackend.expectPOST(URL + '/sessions/login', user).respond(201, result);
          $httpBackend.expectGET(URL + '/user/' + result.id_usuario + '/markings').respond(200);
          $httpBackend.expectGET(URL + '/user/' + result.id_usuario + '/pevs').respond(400);
          $scope.loginAttempt(user);
          $httpBackend.flush();
          expect($state.go).not.toHaveBeenCalled();
          expect($scope.loginError).toBeTruthy();
    });
    it('does not login an user if cannot load its markings', function() {
          var result = {id_usuario: 1, nome_completo: "Lucas Amoẽdo", usuario: "amoedo"}
          $httpBackend.expectPOST(URL + '/sessions/login', user).respond(201, result);
          $httpBackend.expectGET(URL + '/user/' + result.id_usuario + '/markings').respond(400)
          $scope.loginAttempt(user);
          $httpBackend.flush();
          expect($state.go).not.toHaveBeenCalled();
          expect($scope.loginError).toBeTruthy();
    });
  });
  describe('registerSocial', function() {
    it('logs a user through facebook', inject(function($timeout){
      $scope.registerSocial('facebook');
      $timeout.flush();
      $httpBackend.flush();
    }));
  });
});
