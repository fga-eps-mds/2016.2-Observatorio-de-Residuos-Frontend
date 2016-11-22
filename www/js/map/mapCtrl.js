angular.module('app.controllers')


.controller('mapCtrl', function(NgMap, $scope, $ionicModal, $http, $rootScope, URL) {

  NgMap.getGeoLocation().then(function(map) {
    $scope.currentLocation ="["+ map.lat()+","+map.lng()+"]"
  });
  NgMap.getMap().then(function(map) {
    $rootScope.pevs = [];
    $rootScope.markings = [];

        //Initialize all PEVs saved in database
        $http.get(URL + '/pevs')
        .success(function(content){
          angular.forEach(content, function(value, key) {
            $rootScope.pevs.push({
              id_pev: value.id_pev,
              titulo_pev: value.titulo_pev,
              descricao_pev: value.descricao_pev,
              author_name: value.author_name,
              author_email: value.author_email,
              latitude: value.latitude,
              longitude: value.longitude,
              paper: value.paper,
              metal: value.metal,
              plastic: value.plastic,
              glass: value.glass,
              likes: value.total_confirmacoes_funcionando,
              dislikes: value.total_confirmacoes_fechou
            });
          })
          console.log($rootScope.pevs);
        })
        .error(function(data){
          console.log(data)
        });

        //Initialize all Markings savedin database
        $http.get(URL + '/markings')
        .success(function(content){
          angular.forEach(content, function(value, key) {
            $rootScope.markings.push(value);
          })
          console.log($rootScope.markings);
        })
        .error(function(data){
          console.log(data)
        });
      })
})
