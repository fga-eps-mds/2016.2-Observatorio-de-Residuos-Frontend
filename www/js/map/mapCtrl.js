angular.module('app.controllers')


.controller('mapCtrl', function(NgMap, $scope, $ionicModal, $http, $rootScope, URL, $ionicLoading) {

  NgMap.getGeoLocation().then(function(map) {
    $scope.currentLocation ="["+ map.lat()+","+map.lng()+"]"
  });
  $ionicLoading.show({
    template: 'Carregando mapa, aguarde... <ion-spinner icon="android"></ion-spinner>'
  });
  NgMap.getMap().then(function(map) {
    if(angular.isUndefined($rootScope.markings)){
      $rootScope.markings = [];
    }
    if(angular.isUndefined($rootScope.pevs)){
      $rootScope.pevs = [];
    }
        //Initialize all PEVs saved in database
        $http.get(URL + '/pevs')
        .success(function(content){
          $ionicLoading.hide();
          angular.forEach(content, function(value, key) {
            $rootScope.pevs.push(value);
          })
        })
        .error(function(data){
          $ionicLoading.hide();
          $ionicPopup.alert({
            template: 'Erro ao carregar o mapa com as PEVs.',
            title: 'Erro'
          });
          console.log(data)
        });

        //Initialize all Markings saved in database
        $http.get(URL + '/markings')
        .success(function(content){
          $ionicLoading.hide();
          angular.forEach(content, function(value, key) {
            $rootScope.markings.push(value);
          })
        })
        .error(function(data){
          $ionicLoading.hide();
          $ionicPopup.alert({
            template: 'Erro ao carregar o mapa com os Incidentes.',
            title: 'Erro'
          });
          console.log(data)
        });
      })
})
