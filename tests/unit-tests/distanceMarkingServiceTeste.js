describe('ditanceMarkingService', function() { 
  var ditanceMarkingService; 
   
  beforeEach(module('starter')); 
 
  beforeEach(inject(function(_ditanceMarkingService_){ 
    ditanceMarkingService = _ditanceMarkingService_; 
  })); 
 
  it('should get a distance between two points in the globe', function() { 
    var distance = -1; 
    distance = ditanceMarkingService.getDistance(0,0,0,0); 
    expect(distance).toBe(0); 
  }); 
 
  it('should convert degrees to radians', function() { 
    var degrees = 360; 
    distance = ditanceMarkingService.rad(degrees); 
    expect(distance).toBe(2*Math.PI); 
  }); 
 
});