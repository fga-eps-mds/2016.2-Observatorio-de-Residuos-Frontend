angular.module('app.controllers')

.controller('mapCtrl', function(NgMap, $scope, $ionicModal, $http, $rootScope, URL) {
    NgMap.getMap().then(function(map) {
        $rootScope.pevs = [];
        $rootScope.markings = [];

        //Inicializa todas as PEVs salvas no banco.
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
        });

        //Inicializa todas os incidentes salvos no banco.
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

        //Icon for Marking, used in map.html;
        $scope.customIcon = {
          "scaledSize": [50, 50],
          "url": "https://lh4.ggpht.com/Tr5sntMif9qOPrKV_UVl7K8A_V3xQDgA7Sw_qweLUFlg76d_vGFA7q1xIKZ6IcmeGqg=w300"
        };
    })
})
