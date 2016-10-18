angular.module('app.controllers')

.controller('mapCtrl', function(NgMap, $cordovaGeolocation, $scope, $ionicModal) {
  NgMap.getMap().then(function(map) {
    $scope.pev = {};

    google.maps.event.addListener(map, "rightclick", function(event) {
      $scope.pev.latitude = event.latLng.lat();
      $scope.pev.longitude = event.latLng.lng();
      $scope.modal.show();
      console.log("latitude "+$scope.pev.latitude +" longitude "+$scope.pev.longitude);
    });

    var modal = $ionicModal.fromTemplateUrl('views/pev/newPEV.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
    });

  })
})
