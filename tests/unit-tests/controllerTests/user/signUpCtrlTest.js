describe('signupCtrl', function() {
  var $controller;
  var $scope = {};
  var $rootScope;
  var currentUserService;
  var factoryRegister;
  var $httpBackend;
  var $state;
  var URL;

  beforeEach(module('starter'));

  beforeEach(inject(function(_$rootScope_,_$controller_, _currentUserService_,_factoryRegister_, _$httpBackend_, _$state_,$injector){
    $controller = _$controller_;
    currentUserService = _currentUserService_;
    factoryRegister = _factoryRegister_;
    $state = _$state_;
    $rootScope = _$rootScope_
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', /\.html$/).respond('');
    URL = $injector.get('URL');
  }));

  var profiles = [{
    "id_perfil":2,
    "perfil":"Cidadã(o)",
    "descricao_perfil":"descricao",
  },
  {
    "id_perfil":3,
    "perfil":"Síndico(a)/Líder comunitário",
    "descricao_perfil":"descricao",
  },
  {
    "id_perfil":4,
    "perfil":"Dirigente de Associação",
    "descricao_perfil":"descricao",
  }];
  it('should get and store all profiles from database', function() {
    $rootScope.profiles = [];
    $httpBackend.expectGET(URL + '/profiles').respond(200, profiles);
    var controller = $controller('signupCtrl',{$scope: $scope,currentUserService: currentUserService});
    $httpBackend.flush();
    expect($rootScope.profiles).toEqual(profiles);
  });
  it('should get user data from the current user', function() {
    currentUserService.setUserData("Amoedo");
    var controller = $controller('signupCtrl',{$scope: $scope,currentUserService: currentUserService});
    expect($scope.user).toEqual(currentUserService.getUserData());
  });
  it('should create a new JSON in Scope if current user is undefined', function() {
      var controller = $controller('signupCtrl',{$scope: $scope,currentUserService: currentUserService});
      expect($scope.user).toEqual({});
  });
  describe('user validation', function() {
    beforeEach(function() {
      var controller = $controller('signupCtrl',{$scope: $scope,currentUserService: currentUserService});
    });
    var user = {name: "Amoêdo", email: "amoedo@email.com",
              password_digest: "cacofonia", password_confirmation: "cacofonia"};

    it('should encrypt an user password', function() {
      $scope.registerEmail(user);
      expect(user.password_digest).not.toEqual('cacofonia');
    });
    it('should set invalidEmail to false and redirect to tabs.map when getting\
       a successfull response from server during email validation', function() {
      $httpBackend.when('GET', URL+"/profiles").respond(200);
      $httpBackend.expectPOST(URL + '/users/create', user).respond(201);
      $scope.registerEmail(user);
      spyOn($state, 'go');
      $httpBackend.flush();
      expect($scope.invalidEmail).toBeFalsy();
      expect($scope.emailAlreadyUsed).toBeFalsy();
      expect($state.go).toHaveBeenCalledWith('tabs.home');//------
    });
    it('should set invalidEmail to true when getting an error response 400 from\
     server during email validation', function() {
      $httpBackend.when('GET', URL+"/profiles").respond(200);
      $httpBackend.expectPOST(URL + '/users/create', user).respond(400);
      $scope.registerEmail(user);
      $httpBackend.flush();
      expect($scope.invalidEmail).toBeTruthy();
      expect($scope.emailAlreadyUsed).toBeFalsy();
     });
     it('should set emailAlreadyUsed to true when getting and error response 401\
     from server durint email validation', function(){
       $httpBackend.when('GET', URL+"/profiles").respond(200);
       $httpBackend.expectPOST(URL + '/users/create', user).respond(401);
       $scope.registerEmail(user);
       $httpBackend.flush();
       expect($scope.invalidEmail).toBeFalsy();
       expect($scope.emailAlreadyUsed).toBeTruthy();
     })

     it('should leave profiles empty if failed to load', function() {
       $httpBackend.when('GET', URL+"/profiles").respond(400);
       $httpBackend.flush();
       expect($rootScope.profiles).toEqual([]);
      });
  });
});
