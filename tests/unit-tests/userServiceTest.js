describe('currentUserService', function() {
  var currentUserService;
  
  beforeEach(module('starter'));

  beforeEach(inject(function(_currentUserService_){
    currentUserService = _currentUserService_;
  }));

  it('should get and set a user data', function() {
    var userData = "";
    currentUserService.setUserData("Amoêdo");
    userData = currentUserService.getUserData();
    expect(userData).toBe("Amoêdo");
  });

});