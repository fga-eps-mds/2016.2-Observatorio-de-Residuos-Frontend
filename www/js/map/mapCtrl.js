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
                                  name: value.titulo_pev,
                                  description: value.descricao_pev,
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
                                      name: value.titulo_incidente,
                                      description: value.descricao_incidente,
                                      latitude: value.latitude,
                                      longitude: value.longitude,
                                      id_marking_type: value.id_tipo_incidente,
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
