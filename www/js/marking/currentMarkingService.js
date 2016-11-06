angular.module("starter")

.service("currentMarkingService", function(){
	var marking = {};
	var getMarking = function(){
		return marking;
	}
	var setMarking = function(paramMarking){
		marking = paramMarking;
	}
	return{
		getMarking: getMarking,
		setMarking: setMarking
	}
})
