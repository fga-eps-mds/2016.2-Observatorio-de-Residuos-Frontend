angular.module("starter")
 
 //Service to pass clicked markings as scope variables
 .service("currentMarkingService", function() {
  var marking = {};

  var getMarking = function() {
   console.log(this.marking);
   return this.marking;
  }

  var setMarking = function(paramMarking) {
   this.marking = paramMarking;
  }
  
  return {
   getMarking: getMarking,
   setMarking: setMarking
  }
 })