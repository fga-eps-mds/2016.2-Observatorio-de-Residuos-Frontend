angular.module('app.controllers')

//Controller responsible for markings in to contribuindo
.controller('markingsCtrl', function($scope, $http, URL, $rootScope, currentUserService, markingService, $state, NgMap, distanceMarkingService, $ionicLoading) {
  $rootScope.markings = [];
  $rootScope.marking_types = [];
  $scope.nearbyMarkings = [];
  $scope.currentUserEmail = currentUserService.getUserData().email;

  $ionicLoading.show({
    template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });

  NgMap.getGeoLocation().then(function(map) {
    latitudeAtual = map.lat();
    longitudeAtual = map.lng();

    var raio = 5000; //distance in meter

    $http.get(URL + '/marking_types')
    .success(function(content){
      angular.forEach(content, function(value, key) {
        $rootScope.marking_types.push(value);
      });
      $http.get(URL + '/markings')
      .success(function(content){
        $ionicLoading.hide();
        angular.forEach(content, function(value, key) {
          $rootScope.markings.push(value);

          if(distanceMarkingService.getDistance(latitudeAtual, longitudeAtual, value.latitude, value.longitude) <= raio){
              $scope.nearbyMarkings.push(value);
          }
          angular.forEach($scope.marking_types, function (otherValue) {
            if (otherValue.id_tipo_incidente == value.id_tipo_incidente){
              value.tipo_incidente = otherValue.tipo_incidente;
            }
          });

        });
      })
      .error(function(error){
        $ionicLoading.hide(); 
        console.log("Error");
      });
    })
    .error(function(error){
      $ionicLoading.hide();
      console.log("Error");
    });
  },function(error){
    $ionicLoading.hide();
    console.log("Erro ao pegar localização.")
  });

  $scope.openMarking = function (marking) {
    markingService.setMarking(marking);
    $state.go("tabs.markings.detailMarking");
  }
});
