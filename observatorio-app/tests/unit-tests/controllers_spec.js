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
    var factoryRegisterMock, $httpBackend;
      
    beforeEach(inject(function(factoryRegister, _$httpBackend_) {
      factoryRegisterMock = factoryRegister;
      $httpBackend = _$httpBackend_;
      var controller = controllerMock('signupCtrl', {'$scope' : scopeMock, 'factoryRegister' : factoryRegisterMock});
      spyOn(factoryRegisterMock, 'save').andCallThrough();
      $httpBackend.when('GET', /\.html$/).respond('');
    }));

    it("saves a user when the form is valid", function() {
      $httpBackend.expect('POST', 'http://localhost:3000/users/create').respond(200);
      scopeMock.registerEmail(true);
      $httpBackend.flush();
      expect(factoryRegisterMock.save).toHaveBeenCalled();
      expect(scopeMock.errorEmail).toBeFalsy();
    });

    it("it doesn't save a user, and sets an email error, if the email has already been taken", function() {
      $httpBackend.expect('POST', 'http://localhost:3000/users/create').respond(500);
      scopeMock.registerEmail(true)
      $httpBackend.flush();
      expect(factoryRegisterMock.save).toHaveBeenCalled();
      expect(scopeMock.errorEmail).toBeTruthy();
    });

   it("doesn't try to save a user when the form is invalid", function() {
      scopeMock.registerEmail(false, {});
      expect(factoryRegisterMock.save).not.toHaveBeenCalled();
    });

  });

  describe("homeCtrl", function() {
    var stateParamsMock;

    beforeEach(function() {
      var controller = controllerMock('homeCtrl', {'$scope' : scopeMock, '$stateParams': stateParamsMock});
    });

    it("is defined", function(){
      expect(controllerMock).toBeDefined();
      expect(scopeMock).toBeDefined();
    })

  });

  describe("menuCtrl", function() {
    var stateParamsMock;

    beforeEach(function() {
      var controller = controllerMock('menuCtrl', {'$scope' : scopeMock, '$stateParams': stateParamsMock});
    });

    it("is defined", function(){
      expect(controllerMock).toBeDefined();
      expect(scopeMock).toBeDefined();
    })

  });

  describe("signinCtrl", function() {
    var stateParamsMock;

    beforeEach(function() {
      var controller = controllerMock('signinCtrl', {'$scope' : scopeMock, '$stateParams': stateParamsMock});
    });

    it("is defined", function(){
      expect(controllerMock).toBeDefined();
      expect(scopeMock).toBeDefined();
    })

  });

});