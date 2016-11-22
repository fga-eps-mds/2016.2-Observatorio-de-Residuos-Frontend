angular.module("starter")
//Service to pass clicked markings as scope variables
    .service("markingService", function(){
        var marking = {};
        var getMarking = function(){
            return this.marking;
        }
        var setMarking = function(paramMarking){
            this.marking = paramMarking;
        }
        return{
            getMarking: getMarking,
            setMarking: setMarking
        }
    })
