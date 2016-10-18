describe('signupCtrl', function() {
  var $controller;
  var $scope = {};
  var currentUserService;
  var factoryRegister;
  var $httpBackend;
  var $state;
  var URL;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$controller_, _currentUserService_, 
                             _factoryRegister_, _$httpBackend_, _$state_,
                             $injector){
    $controller = _$controller_;
    currentUserService = _currentUserService_;
    factoryRegister = _factoryRegister_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = $injector.get('URL');
  }));

  beforeEach(function() {
    var controller = $controller('signupCtrl', 
                                  {$scope: $scope, 
                                  currentUserService: currentUserService
                                  });
  });

  it('should get user data from the current user', function() {
    expect($scope.user).not.toBe(null);
  });

  describe('user validation', function() {
    var user = {name: "Amoêdo", email: "amoedo@email.com", 
              password_digest: "cacofonia", password_confirmation: "cacofonia"};

    it('should encrypt an user password', function() {
      $scope.registerEmail(user);
      expect(user.password_digest).not.toEqual('cacofonia');
      expect(user.password_confirmation).not.toEqual('cacofonia');
      expect(user.password_confirmation).toEqual(user.password_digest)
    });

    it('should set invalidEmail to false and redirect to menu.home when getting\
       a successfull response from server during email validation', function() {
      $httpBackend.expectPOST(URL + '/users/create', user).respond(201);
      $scope.registerEmail(user);
      spyOn($state, 'go');
      $httpBackend.flush();
      expect($scope.invalidEmail).toBeFalsy();
      expect($state.go).toHaveBeenCalledWith('menu.home');
    });

    it('should set invalidEmail to true when getting an error response from\
     server during email validation', function() {
      $httpBackend.expectPOST(URL + '/users/create', user).respond(401);
      $scope.registerEmail(user);
      $httpBackend.flush();
      expect($scope.invalidEmail).toBeTruthy();
     });

  });

});