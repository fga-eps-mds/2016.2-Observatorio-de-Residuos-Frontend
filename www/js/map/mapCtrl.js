angular.module('app.controllers')


.controller('mapCtrl', function(NgMap, $state, $scope, $ionicModal, $http, $rootScope, URL, $ionicLoading, $ionicPopup) {

  $scope.$on("$ionicView.enter", function() {

    $ionicLoading.show({
      template: 'Carregando mapa, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });

    NgMap.getGeoLocation().then(function(map) {
      $ionicLoading.hide();
      $scope.currentLocation ="["+ map.lat()+","+map.lng()+"]"
    }, function(error) {
      $ionicLoading.hide( );
      $ionicPopup.alert({template: "Não foi possível encontrar o GPS."})
      .then(function() {
        $state.go('tabs.home');
      });
    });

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

          angular.forEach(content, function(value, key) {
            $rootScope.pevs.push(value);
          })
        })
        .error(function(data){

          $ionicPopup.alert({
            template: 'Erro ao carregar o mapa com as PEVs.',
            title: 'Erro'
          });
          console.log(data)
        });

        //Initialize all Markings saved in database
        $http.get(URL + '/markings')
        .success(function(content){

          angular.forEach(content, function(value, key) {
            $rootScope.markings.push(value);
          })
        })
        .error(function(data){

          $ionicPopup.alert({
            template: 'Erro ao carregar o mapa com os Incidentes.',
            title: 'Erro'
          });
          console.log(data)
        });
      })
})
