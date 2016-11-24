angular.module('app.controllers')


//Controller responsible for pevs in to contribuindo
.controller('pevsCtrl', function($scope, $http, URL, $rootScope, currentUserService, NgMap, distanceMarkingService, pevService, $state) {
    $rootScope.pevs = [];
    $scope.nearbyPevs = [];
    $scope.pevs_types = [];
    $scope.currentUserEmail = currentUserService.getUserData().email;

    NgMap.getGeoLocation().then(function(map) {
        currentLatitude = map.lat();
        currentLongitude = map.lng();

        var raio = 30; //distance in meter

        $http.get(URL + '/pevs')
        .success(function(content){
            angular.forEach(content, function(value, key) {
                $scope.pev_types = "";
                if (value.paper == true)
                    $scope.pev_types = "-Papel-";
                if (value.glass == true)
                    $scope.pev_types += "-Vidro-";
                if (value.metal == true)
                    $scope.pev_types += "-Metal-";
                if (value.plastic == true)
                    $scope.pev_types += "-Plástico-";
                
                $rootScope.pevs.push(value);
                $scope.pevs_types.push($scope.pev_types);

                if(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude) <= raio){
                  $scope.nearbyPevs.push(value);
                }
                console.log(value.titulo_pev);
                console.log($scope.pev_types);
                console.log(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude));       
            })
            console.log($scope.pevs_types);
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
