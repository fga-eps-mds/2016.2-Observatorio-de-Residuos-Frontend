angular.module('app.controllers')

.controller('mapCtrl', function(NgMap, $scope, $ionicModal, $http, $rootScope, URL) {
  NgMap.getMap().then(function(map) {
    google.maps.event.addListener(map, "rightclick", function(event) {
      $scope.pev = {};
      $scope.pev.latitude = event.latLng.lat();
      $scope.pev.longitude = event.latLng.lng();
      $scope.modal.show();
      console.log("latitude "+$scope.pev.latitude +" longitude "+$scope.pev.longitude);
    });
    $rootScope.pevs = [];

    $http.get(URL + '/pevs')
    .success(function(content){
      angular.forEach(content, function(value, key) {
        $rootScope.pevs.push(value);
      })
    })

    .error(function(data){
      console.log(data)
    });

    var modal = $ionicModal.fromTemplateUrl('views/pev/newPEV.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
    });

  })
})
