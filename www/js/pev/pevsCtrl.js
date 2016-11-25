angular.module('app.controllers')

//Controller responsible for pevs in to contribuindo
.controller('pevsCtrl', function($scope, $http, URL, $rootScope, currentUserService, NgMap, distanceMarkingService, pevService, $state, $ionicLoading) {
    $rootScope.pevs = [];
    $rootScope.nearbyPevs = [];
    $scope.typesMyPevs = [];
    $scope.typesNearbyPevs = [];
    $scope.currentUserEmail = currentUserService.getUserData().email;

    $scope.openPev = function (pev) {
      pevService.setPev(pev);
      $state.go("tabs.markings.detailPev");
    }
    $ionicLoading.show({template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'});

    NgMap.getGeoLocation().then(function(map) {
        $ionicLoading.hide();
        currentLatitude = map.lat();
        currentLongitude = map.lng();

        var raio = 10000; //distance in meter

        $http.get(URL + '/pevs')
        .success(function(content){
            angular.forEach(content, function(value, key) {
                $scope.type = [];
                if (value.paper == true)
                    $scope.type.push("Papel");
                if (value.glass == true)
                    $scope.type.push("Vidro");
                if (value.metal == true)
                    $scope.type.push("Metal");
                if (value.plastic == true)
                    $scope.type.push("Plástico");

                $rootScope.pevs.push(value);
                $scope.typesMyPevs.push($scope.type);

                if(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude) <= raio){
                  $rootScope.nearbyPevs.push(value);
                  $scope.typesNearbyPevs.push($scope.type);
                }
                console.log(value.titulo_pev);
                console.log($scope.type);
                console.log(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude));
            })

            $scope.myPevsWithTipes = $rootScope.pevs.map(function(value, index) { //map pevs and types for ng-repeat
                    return {
                        data: value,
                        type: $scope.typesMyPevs[index]
                    }
            });
            $scope.nearbyPevsWithTipes = $rootScope.nearbyPevs.map(function(value, index) { //map pevs and types for ng-repeat
                    return {
                        data: value,
                        type: $scope.typesNearbyPevs[index]
                    }
            });
            console.log($scope.typesMyPevs);
            console.log($scope.typesNearbyPevs);
        })
        .error(function(error){
            $ionicPopup.alert({
                template: 'Não foi possível acessar o PEV, tente novamente.',
                title: 'Erro'
            });
            console.log("Error");
        });
      }, function(error){
        $ionicPopup.alert({
            template: 'Erro de obtenção de localização.',
            title: 'Erro'
        });
      });
});
