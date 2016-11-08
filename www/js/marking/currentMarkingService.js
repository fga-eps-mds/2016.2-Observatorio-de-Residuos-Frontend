angular.module("starter")

.service("currentMarkingService", function(){
	var marking = {};
	var getMarking = function(){
		console.log(this.marking);
		return this.marking;
	}
	var setMarking = function(paramMarking){
		console.log(paramMarking);
		this.marking = paramMarking;
	}
	return{
		getMarking: getMarking,
		setMarking: setMarking
	}
})
