angular.module("starter")

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