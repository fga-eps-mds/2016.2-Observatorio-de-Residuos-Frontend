angular.module('app.controllers')


.controller('mapCtrl', function(NgMap, $state, $scope, $ionicModal, $http, $rootScope, URL, $ionicLoading, $ionicPopup) {

  $scope.$on("$ionicView.enter", function() {

    $ionicLoading.show({
      template: 'Carregando mapa, aguarde... <ion-spinner icon="android"></ion-spinner>'
    });

    document.addEventListener('deviceready', function() {

      NgMap.getGeoLocation().then(function(map) {
      
        $ionicLoading.hide();
        $scope.currentLocation ="["+ map.lat()+","+map.lng()+"]"
      
      }, function(error) {

        console.log(error);
        $ionicLoading.hide( );
        $ionicPopup.alert({template: "Não foi possível obter sua localização."})
        .then(function() {
          $state.go('tabs.home');
        });
      
      });
    
    });

  });
  
  NgMap.getMap().then(function(map) {
    google.maps.event.addListener(map, "idle", function(){
      google.maps.event.trigger(map, 'resize'); 
    });
  })

  if(angular.isUndefined($rootScope.markings)){
    $rootScope.markings = [];
  }
  if(angular.isUndefined($rootScope.pevs)){
    $rootScope.pevs = [];
  }
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
