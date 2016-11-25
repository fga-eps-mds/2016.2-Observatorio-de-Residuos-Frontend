angular.module('app.controllers')

    //Controller responsible for projects in to contribuindo
    .controller('projectsCtrl', function($scope, $http, URL, $rootScope, projectService, $state, $ionicLoading, $ionicPopup) {
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
                $ionicPopup.alert({
                    template: 'Erro ao carregar o mapa com os Projetos.',
                    title: 'Erro'
                });
                console.log("Error");
            })

        $scope.openProject = function (project) {
            projectService.setProject(project);
            $state.go("tabs.to-contribuindo.detailProject");
        }
    })
