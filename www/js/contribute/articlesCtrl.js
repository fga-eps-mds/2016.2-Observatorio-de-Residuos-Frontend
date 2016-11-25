angular.module('app.controllers')

    //Controller responsible for articles in to contribuindo
    .controller('articlesCtrl', function($scope, $http, URL, $rootScope, articleService, $state, $ionicLoading) {
        $rootScope.articles = [];
        $ionicLoading.show({
            template: 'Por favor, aguarde... <ion-spinner icon="android"></ion-spinner>'
        });
        $http.get(URL + '/articles')
            .success(function(content){
                $ionicLoading.hide();
                angular.forEach(content, function(value, key) {
                    $rootScope.articles.push(value);
                })
            })
            .error(function(error){
                $ionicLoading.hide();
                console.log("Error");
            })

        $scope.openArticle = function (article) {
            articleService.setArticle(article);
            $state.go("tabs.to-contribuindo.detailArticle");
        }
    })
