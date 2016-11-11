angular.module("starter")

//Service para passar a PEV clicada como variável de escopo.
.service("currentPEVservice", function(){
	var PEV = {};
	var getPEV = function(){
		return PEV;
	}
	var setPEV = function(paramPEV){
		PEV = paramPEV;
	}
	return{
		getPEV: getPEV,
		setPEV: setPEV
	}
})
