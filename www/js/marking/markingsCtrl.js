angular.module('app.controllers')

//Controller responsible for articles in to contribuindo
    .controller('markingsCtrl', function($scope, $http, URL, $rootScope) {
        $rootScope.markings = [];
        $http.get(URL + '/markings')
            .success(function(content){
                angular.forEach(content, function(value, key) {
                    $rootScope.markings.push(value);
                })
            })
            .error(function(error){
                console.log("Error");
            })
    })
