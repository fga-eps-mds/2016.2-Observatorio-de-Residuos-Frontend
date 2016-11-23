describe('currentPEVservice', function() {
  var currentPEVservice;
  
  beforeEach(module('starter'));

  beforeEach(inject(function(_currentPEVservice_){
    currentPEVservice = _currentPEVservice_;
  }));

  it('should get and set a PEV data', function() {
    var PEVData = "";
    currentPEVservice.setPEV("PEV teste");
    PEVData = currentPEVservice.getPEV();
    expect(PEVData).toBe("PEV teste");
  });
});