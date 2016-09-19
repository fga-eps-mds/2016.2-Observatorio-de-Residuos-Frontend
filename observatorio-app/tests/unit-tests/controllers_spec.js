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
    var factoryRegisterMock;
      
    beforeEach(inject(function(factoryRegister) {
      factoryRegisterMock = factoryRegister;
      var controller = controllerMock('signupCtrl', {'$scope' : scopeMock, 'factoryRegister' : factoryRegisterMock});
      spyOn(factoryRegisterMock, 'save').andCallThrough();
    }));
   
    it("saves a user when the form is valid", inject(function($window) {
      scopeMock.registerEmail(true, {});
      expect(factoryRegisterMock.save).toHaveBeenCalled();
    }));

   it("doesn't save a user, and sets an email error, when the form is invalid", function() {
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