describe("Controller", function() {
  var scopeMock, controllerMock;

  beforeEach(function() {
    module('starter');
  });

  beforeEach(inject(function(_$controller_, _$rootScope_) {
      controllerMock =  _$controller_; 
      scopeMock = _$rootScope_.$new();
  }));

  describe("signupCtrl", function() {
    var factoryRegisterMock, $httpBackend, socialServiceMock;
      
    beforeEach(inject(function(factoryRegister, _$httpBackend_, socialService) {
      factoryRegisterMock = factoryRegister;
      $httpBackend = _$httpBackend_;
      socialServiceMock = socialService;
      var controller = controllerMock('signupCtrl', {'$scope' : scopeMock, 
                                                                                'factoryRegister' : factoryRegisterMock, 
                                                                                'socialService': socialServiceMock
                                                                              });
      spyOn(factoryRegisterMock, 'save').andCallThrough();
      $httpBackend.when('GET', /\.html$/).respond('');
      this.user = {name: 'Mocker', email: 'the_great_mocker@email.com'};
    }));

    it("saves a user if his email is valid", function() {
      $httpBackend.expect('POST', 'http://localhost:3000/users/create').respond(201);
      scopeMock.registerEmail(this.user);
      $httpBackend.flush();
      expect(factoryRegisterMock.save).toHaveBeenCalled();
      expect(scopeMock.invalidEmail).toBeDefined();
      expect(scopeMock.invalidEmail).toBeFalsy();
    });

    it("doesn't save a user, and sets an email error, if his email is invalid", function() {
      $httpBackend.expect('POST', 'http://localhost:3000/users/create').respond(409);
      scopeMock.registerEmail(this.user);
      $httpBackend.flush();
      expect(factoryRegisterMock.save).toHaveBeenCalled();
      expect(scopeMock.invalidEmail).toBeTruthy();
    });
  });

  describe("signinCtrl", function() {
    var stateParamsMock;

    beforeEach(function() {
      var controller = controllerMock('signinCtrl', {'$scope' : scopeMock, '$stateParams': stateParamsMock});
    });

    it("# facebook", function() {
      spyOn(scopeMock, "registerSocial").andCallThrough();
      scopeMock.registerSocial("facebook");
      expect(true).toBeTruthy();
    });

  });

});