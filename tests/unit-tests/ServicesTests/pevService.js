describe('pevService', function() {
  var pevService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_pevService_){
    pevService = _pevService_;
  }));

  it('should get and set a user data', function() {
    var pev = "";
    pevService.setPev("Pev do Amoêdo Mitoso");
    pev = pevService.getPev();
    expect(pev).toBe("Pev do Amoêdo Mitoso");
  });

});
