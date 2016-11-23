describe('EditProfileCtrl', function(){
  var $controller;
  var $scope;
  var $rootScope;
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
    _$timeout_, _$state_, _currentUserService_){
    
    $controller = _$controller_;
    $rootScope = _$rootScope_;
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

  describe('when initializing controller', function() {
    it('should get and store all profiles from database', function() {
      $rootScope.profiles = [];
      $httpBackend.expectGET(URL + '/profiles').respond(200, profiles);
      $httpBackend.flush();
      expect($rootScope.profiles).toEqual(profiles);
    });

    it('should do nothing on failed connection to database when getting\
     profiles', function() {
      $httpBackend.expectGET(URL + '/profiles').respond(400);
      $httpBackend.flush();
    });
  });

  describe('when editing an user', function() {
    beforeEach(function(){
      $httpBackend.expectGET(URL + '/profiles').respond(200);
      spyOn(currentUserService, 'setUserData');
      spyOn($state, 'go');
      $scope.editUser(user);

    });

    it('should update the current user and redirect to profile on successfull\
     edit', function() {
      var editedUser = user;
      $httpBackend.expectPOST(URL + '/users/edit').respond(200, editedUser);
      $httpBackend.flush();
      expect(currentUserService.setUserData).toHaveBeenCalledWith(editedUser);
      expect($state.go).toHaveBeenCalledWith('tabs.profile');
    });

    it('should do nothing on failed connection when editing an\
     user', function() {
      $httpBackend.expectPOST(URL + '/users/edit').respond(400);
      $httpBackend.flush();
      expect(currentUserService.setUserData).not.toHaveBeenCalled();
      expect($state.go).not.toHaveBeenCalled();
    })
  });

  describe('when trying to deactivate an account', function() {
    it('should call a popup when requesting account deactivation', function() {
      spyOn($ionicPopup, 'show');
      $scope.deactivateAccount(user);
      expect($ionicPopup.show).toHaveBeenCalled();
    });

    describe('in successfull account deactivation', function() {
      beforeEach(function(){
        $scope.user = {id_usuario: 1}
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
        $scope.user = {id_usuario: 1}
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
});
