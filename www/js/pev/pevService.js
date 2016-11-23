angular.module("starter")
//Service to pass clicked pevs as scope variables
    .service("pevService", function(){
        var pev = {};
        var getPev = function(){
            return this.pev;
        }
        var setPev = function(paramPev){
            this.pev = paramPev;
        }
        return{
            getPev: getPev,
            setPev: setPev
        }
    })
