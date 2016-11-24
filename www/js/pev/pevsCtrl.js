angular.module('app.controllers')


//Controller responsible for pevs in to contribuindo
.controller('pevsCtrl', function($scope, $http, URL, $rootScope, currentUserService, NgMap, distanceMarkingService) {
    $rootScope.pevs = [];
    $rootScope.nearbyPevs = [];
    $scope.currentUserEmail = currentUserService.getUserData().email;

    NgMap.getGeoLocation().then(function(map) {
        currentLatitude = map.lat();
        currentLongitude = map.lng();

        var raio = 3; //distance in meter

        $http.get(URL + '/pevs')
        .success(function(content){
            angular.forEach(content, function(value, key) {
                $rootScope.pev_types = "";
                if (value.paper == true)
                    $rootScope.pev_types = "Papel";
                if (value.glass == true)
                    $rootScope.pev_types += " Vidro";
                if (value.metal == true)
                    $rootScope.pev_types += " Metal";
                if (value.plastic == true)
                    $rootScope.pev_types += " Plástico";

                console.log($rootScope.pev_types);
                $rootScope.pevs.push(value);
                if(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude) <= raio){
                  $rootScope.nearbyPevs.push(value);
                }
                console.log(value.titulo_pev);
                console.log(distanceMarkingService.getDistance(currentLatitude, currentLongitude, value.latitude, value.longitude));       
                //angular.forEach($scope.pev_types, function (otherValue) {
                //if (otherValue.id_tipo_incidente == value.id_tipo_incidente){
                //    value.tipo_incidente = otherValue.tipo_incidente;
                //}
            })
        })
        .error(function(error){
            console.log("Error");
        });
    });

    $scope.openPev = function (pev) {
        pevService.setPev(pev);
        $state.go("tabs.to-contribuindo.detailPev");
    }

});
