angular.module('app.controllers')

//Controller responsible for pevs in to contribuindo
    .controller('pevsCtrl', function($scope, $http, URL, $rootScope, currentUserService, $ionicLoading) {
        $rootScope.pevs = [];
        $rootScope.pev_types = [];
        $scope.currentUserEmail = currentUserService.getUserData().email;
          $ionicLoading.show({
          template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
          });
        $http.get(URL + '/pev_types')
            .success(function(content){
                $ionicLoading.hide();
                angular.forEach(content, function(value, key) {
                    $rootScope.pev_types.push(value);
                })
                $http.get(URL + '/pevs')
                    .success(function(content){
                        $ionicLoading.hide();
                        angular.forEach(content, function(value, key) {
                            angular.forEach($scope.pev_types, function (otherValue) {
                                if (otherValue.id_tipo_incidente == value.id_tipo_incidente){
                                    value.tipo_incidente = otherValue.tipo_incidente;
                                }
                            })
                            $rootScope.pevs.push(value);
                        })
                    })
                    .error(function(error){
                        $ionicLoading.hide();
                        console.log("Error");
                    })
            })
            .error(function(error){
                $ionicLoading.hide();
                console.log("Error");
            })

        $scope.openPev = function (pev) {
            pevService.setPev(pev);
            $state.go("tabs.to-contribuindo.detailPev");
        }


    })
