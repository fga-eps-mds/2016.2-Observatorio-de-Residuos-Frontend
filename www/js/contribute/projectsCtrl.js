angular.module('app.controllers')

    //Controller responsible for projects in to contribuindo
    .controller('projectsCtrl', function($scope, $http, URL, $rootScope, projectService, $state) {
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

        $scope.openProject = function (project) {
            projectService.setProject(project);
            $state.go("tabs.to-contribuindo.detailProject");
        }
    })
