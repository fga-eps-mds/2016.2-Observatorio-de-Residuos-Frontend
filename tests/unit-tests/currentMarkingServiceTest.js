describe('currentMarkingService', function() {
  var currentMarkingService;
  
  beforeEach(module('starter'));

  beforeEach(inject(function(_currentMarkingService_){
    currentMarkingService = _currentMarkingService_;
  }));

  it('should get and set a Marking data', function() {
    var MarkingData = "";
    currentMarkingService.setMarking("Marking teste");
    MarkingData = currentMarkingService.getMarking();
    expect(MarkingData).toBe("Marking teste");
  });
});