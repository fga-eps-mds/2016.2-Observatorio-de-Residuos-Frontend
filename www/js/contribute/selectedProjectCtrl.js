angular.module('app.controllers')

//Controller responsible for projects in to contribuindo
    .controller('selectedProjectCtrl', function($scope, $http, URL, $rootScope, projectService, $state) {
        $scope.selected_project = projectService.getProject();

    })
