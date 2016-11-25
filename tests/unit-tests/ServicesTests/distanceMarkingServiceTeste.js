describe('distanceMarkingService', function() { 
  var distanceMarkingService; 
   
  beforeEach(module('starter')); 
 
  beforeEach(inject(function(_distanceMarkingService_){ 
    distanceMarkingService = _distanceMarkingService_; 
  })); 
 
  it('should get a distance between two coordinates in the globe', function() { 
    var distance = -1; 
    distance = distanceMarkingService.getDistance(12.3456, 78.9101, 12.3456, 78.9101); 
    expect(distance).toBe(0); 
  }); 
 
  it('should convert degrees to radians', function() { 
    var degrees = 360; 
    distance = distanceMarkingService.rad(degrees); 
    expect(distance).toBe(2*Math.PI); 
  }); 
 
});