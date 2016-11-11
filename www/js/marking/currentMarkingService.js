angular.module("starter")
//Service para passar a marcação clicada como variável de escopo
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
