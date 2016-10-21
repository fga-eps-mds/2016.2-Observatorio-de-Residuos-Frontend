angular.module('app.controllers')

.controller('mapCtrl', function(NgMap, $cordovaGeolocation, $scope, $ionicModal) {
  NgMap.getMap().then(function(map) {

    google.maps.event.addListener(map, "rightclick", function(event) {
      $scope.marking = {};
      $scope.marking.latitude = event.latLng.lat();
      $scope.marking.longitude = event.latLng.lng();
      $scope.modal.show();
      console.log("latitude "+$scope.marking.latitude +" longitude "+$scope.marking.longitude);
    });

    var modal = $ionicModal.fromTemplateUrl('views/marking/newMarking.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
    });

  })
})
