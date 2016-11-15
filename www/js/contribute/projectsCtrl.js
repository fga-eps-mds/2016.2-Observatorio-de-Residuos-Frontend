angular.module('app.controllers')

    .controller('projectsCtrl', function($scope, $http, URL, $rootScope) {
        $rootScope.projects = [];
        $http.get(URL + '/projects')
            .success(function(content){
                angular.forEach(content, function(value, key) {
                    $rootScope.projects.push(value);
                })
            })
            .error(function(error){
                console.log("Error");
            })
    })
