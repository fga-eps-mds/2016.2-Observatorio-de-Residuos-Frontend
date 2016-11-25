angular.module('app.controllers')

    //Controller responsible for projects in to contribuindo
    .controller('projectsCtrl', function($scope, $http, URL, $rootScope, projectService, $state, $ionicLoading) {
        $rootScope.projects = [];
        $ionicLoading.show({
            template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
        });
        $http.get(URL + '/projects')
            .success(function(content){
                $ionicLoading.hide();
                angular.forEach(content, function(value, key) {
                    $rootScope.projects.push(value);
                })
            })
            .error(function(error){
                $ionicLoading.hide();
                console.log("Error");
            })

        $scope.openProject = function (project) {
            projectService.setProject(project);
            $state.go("tabs.to-contribuindo.detailProject");
        }
    })
