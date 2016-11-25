describe('markingService', function() {
  var markingService;

  beforeEach(module('starter'));

  beforeEach(inject(function(_markingService_){
    markingService = _markingService_;
  }));

  it('should get and set a user data', function() {
    var marking = "";
    markingService.setMarking("Marking do Amoêdo Mitoso");
    marking = markingService.getMarking();
    expect(marking).toBe("Marking do Amoêdo Mitoso");
  });

});
