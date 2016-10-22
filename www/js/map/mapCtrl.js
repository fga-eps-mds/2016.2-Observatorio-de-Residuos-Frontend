angular.module('app.controllers')

.controller('mapCtrl', function(NgMap, $cordovaGeolocation, $scope, $ionicModal, $ionicPopup) {
  NgMap.getMap().then(function(map) {
    google.maps.event.addListener(map, "rightclick", function(event) {
      $scope.pev = {};
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

    $scope.informationPEV = function (pev) {
        var alertPopup = $ionicPopup.alert({
          title: 'Titulo',
          template: 'descricao!'
          //Adicionar pev.name, pev.description e materias recolhidos
        });
    }
/* 
    $ionicPopover.fromTemplateUrl('views/pev/popover.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });
*/
  })
})
