angular.module('app.controllers')

.controller('mapCtrl', function(NgMap, $scope, $ionicModal, $http, $rootScope, URL) {
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
              glass: value.glass
            });
          })
        })
        .error(function(data){
          console.log(data)
        });

        //Initialize all Markings savedin database
        $http.get(URL + '/markings')
        .success(function(content){
          angular.forEach(content, function(value, key) {
            $rootScope.markings.push({
              id_incidente: value.id_incidente,
              latitude: value.latitude,
              longitude: value.longitude,
              id_tipo_incidente: value.id_tipo_incidente,
              titulo_incidente: value.titulo_incidente,
              descricao_incidente: value.descricao_incidente,
              author_name: value.author_name,
              author_email: value.author_email
            });
          })
        })
        .error(function(data){
          console.log(data)
        });
      })
})
