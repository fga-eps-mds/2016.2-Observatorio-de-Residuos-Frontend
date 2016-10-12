angular.module('app.controllers')

/* Controller do mapa principal*/
.controller('mapCtrl', function($scope, NgMap){

  NgMap.getMap().then(function(map) {
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
    console.log(map.getCenter());
  })
  
  $scope.getPosition = function(event) {
    console.log("LATITUDE: " + event.latLng.lat() + "LONGITUDE: " + event.latLng.lng());
  };

})
