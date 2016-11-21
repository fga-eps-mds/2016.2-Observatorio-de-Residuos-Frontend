angular.module('app.controllers')

//Controller responsible for articles in to contribuindo
    .controller('markingsCtrl', function($scope, $http, URL, $rootScope, currentUserService) {
        $rootScope.markings = [];
        $rootScope.marking_types = [];
        $scope.currentUserEmail = currentUserService.getUserData().email;


        
        $http.get(URL + '/markings')
            .success(function(content){
                angular.forEach(content, function(value, key) {
                    $rootScope.markings.push(value);
                })

                $http.get(URL + '/marking_types')
                    .success(function(content){
                        angular.forEach(content, function(value, key) {
                            $rootScope.marking_types.push(value);
                        })

                        $scope.getMarkingType = function (id_tipo_incidente) {
                            angular.forEach($scope.marking_types, function (value) {
                                if (id_tipo_incidente == value.id_tipo_incidente){
                                    console.log(value.id_tipo_incidente)
                                    return value.id_tipo_incidente; //teste
                                }

                            })

                        }

                    })
                    .error(function(error){
                        console.log("Error");
                    })

            })
            .error(function(error){
                console.log("Error");
            })
        

    })
