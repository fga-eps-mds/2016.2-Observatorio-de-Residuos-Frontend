angular.module("starter") 
//Service to pass clicked pevs as scope variables 
.service("distanceMarkingService", function(){ 
    var rad = function(x) { 
        return x * Math.PI / 180; 
    }; 
 
    var getDistance = function(p1lat, p1lng, p2lat, p2lng) { 
        var R = 6378137; // Earth’s mean radius in meter 
        var dLat = rad(p2lat - p1lat); 
        var dLong = rad(p2lng - p1lng); 
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
        Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) * 
        Math.sin(dLong / 2) * Math.sin(dLong / 2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        var d = R * c; 
        return d; // returns the distance in meter 
    }; 
 
    return{ 
        getDistance: getDistance, 
        rad: rad 
    } 
});
