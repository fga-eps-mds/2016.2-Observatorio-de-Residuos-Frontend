angular.module('app.controllers')


//Controller responsible for pevs in to contribuindo
.controller('pevsCtrl', function($scope, $http, URL, $rootScope, currentUserService, NgMap, distanceMarkingService, pevService, $state) {
    $rootScope.pevs = [];
    $scope.nearbyPevs = [];
    $scope.types = [];
    $scope.currentUserEmail = currentUserService.getUserData().email;

    NgMap.getGeoLocation().then(function(map) {
        currentLatitude = map.lat();
        currentLongitude = map.lng();

        var raio = 30; //distance in meter

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
                $scope.types.push($scope.type);

                if(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude) <= raio){
                  $scope.nearbyPevs.push(value);
                }
                console.log(value.titulo_pev);
                console.log($scope.type);
                console.log(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude));       
            })

            $scope.PEVSS = $rootScope.pevs.map(function(value, index) { //map pevs and types for ng-repeat
                    return {
                        data: value,
                        type: $scope.types[index]
                    }
            });

            console.log($scope.types);
        })
        .error(function(error){
            console.log("Error");
        });
    });

    $scope.openPev = function (pev) {
        pevService.setPev(pev);
        $state.go("tabs.markings.detailPev");
    }

});
